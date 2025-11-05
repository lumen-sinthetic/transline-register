import { Button } from "@components/atoms/button";
import { Container } from "@components/atoms/container";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/atoms/input-otp";
import RegisterText from "@components/molecules/register/register-text";
import { useRegisterContext } from "@components/templates/register-progress";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

function OtpCheck() {
  const { temporaryData } = useRegisterContext();
  const { phone_number } = temporaryData as { phone_number: string };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ otp: string }>({
    defaultValues: { otp: "" },
  });

  const onSubmit = handleSubmit(async data => {
    await promiseGenerator(data);
  });

  return (
    <div className="otp-check">
      <Container className="py-24">
        <RegisterText
          title="Введите код из SMS"
          description={`Код отправлен на номер ${phone_number}`}
        />

        <form
          onSubmit={onSubmit}
          className="my-8 space-y-8"
        >
          {/* <div></div> */}
          <Controller
            name="otp"
            control={control}
            render={({ field: { name, value, onChange } }) => (
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
            )}
          />

          <Button>Отправить повторно</Button>
        </form>
      </Container>
    </div>
  );
}

export default OtpCheck;
