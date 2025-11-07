"use client";

import { Button } from "@components/atoms/button";
import { Checkbox } from "@components/atoms/checkbox";
import { Container } from "@components/atoms/container";
import RegisterText from "@components/molecules/register/register-text";
import SimplePhoneInput from "@components/molecules/simple-phone-input";
import { useRegisterContext } from "@components/templates/register-progress";
import { useSaveOnUnload } from "@entities/auth/helpers/save-data";
import { usePhoneSchema } from "@entities/auth/models/register-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { cn } from "@shared/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

function PhoneRegister({ classname }: { classname?: string }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const { goForward, temporaryData } = useRegisterContext();
  const schema = usePhoneSchema();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: temporaryData,
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async data => {
    const res = await promiseGenerator(data);
    goForward(res);
  });

  useSaveOnUnload(watch());

  return (
    <div className={cn("register-phone", classname)}>
      <Container className="py-24">
        <RegisterText
          title="Регистрация"
          description="Для входа в личный кабинет введите свой номер телефона, на него будет отправлено SMS с проверочным кодом"
        />

        <form
          onSubmit={onSubmit}
          className="space-y-8 my-8"
        >
          <SimplePhoneInput
            control={control}
            name="phone_number"
          />

          <label className="flex gap-2 items-center">
            <Checkbox
              checked={isAccepted}
              onCheckedChange={v => setIsAccepted(Boolean(v))}
            />
            <span className="font-light">
              Согласен с{" "}
              <Link
                className="underline"
                href={"#"}
              >
                политикой конфиденциальности
              </Link>
            </span>
          </label>

          <Button
            className="w-full uppercase relative"
            size={"lg"}
            type="submit"
            disabled={isSubmitting || !isAccepted || !isValid}
          >
            <span className={cn({ invisible: isSubmitting })}>Войти</span>
            {isSubmitting && <Loader2 className="animate-spin absolute" />}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default PhoneRegister;
