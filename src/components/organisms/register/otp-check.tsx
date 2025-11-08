import { Container } from "@components/atoms/container";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/atoms/input-otp";
import OtpTimer from "@components/molecules/register/otp-timer";
import RegisterText from "@components/molecules/register/register-text";
import { useRegisterContext } from "@components/templates/register-progress";
import { useOtpSchema } from "@entities/auth/models/register-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { interMask } from "@shared/lib/phone/tools";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function OtpCheck() {
  const { temporaryData, goForward } = useRegisterContext();
  const schema = useOtpSchema();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: { otp: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async data => {
    await promiseGenerator(data);
    goForward();
  });

  return (
    <div className="otp-check">
      <Container>
        <RegisterText
          title="Введите код из SMS"
          //TODO: add here mask with brackets
          description={`Код отправлен на номер ${interMask(temporaryData.phone_number || "")}`}
        />

        <form
          onSubmit={onSubmit}
          className="my-8 space-y-8"
        >
          <Controller
            name="otp"
            control={control}
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={value}
                  name={name}
                  disabled={isSubmitting}
                  onChange={v => {
                    onChange(v);
                    if (v.length === 6) onSubmit();
                  }}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }, (_, index) => (
                      <InputOTPSlot
                        // biome-ignore lint/suspicious/noArrayIndexKey: <index is only key>
                        key={index}
                        index={index}
                      />
                    ))}
                    {isSubmitting && (
                      <Loader2 className="animate-spin text-primary" />
                    )}
                  </InputOTPGroup>
                </InputOTP>
                {error && (
                  <span className="error text-xs text-red-500">
                    {error.message}
                  </span>
                )}
              </>
            )}
          />

          <OtpTimer
            sendFn={() => {
              toast.info("Код отправлен повторно");
            }}
          />
        </form>
      </Container>
    </div>
  );
}

export default OtpCheck;
