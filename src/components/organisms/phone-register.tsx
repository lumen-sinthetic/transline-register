"use client";

import { Button } from "@components/atoms/button";
import { Checkbox } from "@components/atoms/checkbox";
import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import SimplePhoneInput from "@components/molecules/simple-phone-input";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { cn } from "@shared/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePhoneSchema } from "@shared/schemas/register-schemas";
import { useRegisterContext } from "@components/templates/RegisterProgress";

function PhoneRegister({ classname }: { classname?: string }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const schema = usePhoneSchema();
  const { goForward, temporaryData } = useRegisterContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<{ phone_number: string }>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: temporaryData,
    resolver: zodResolver(schema),
  });

  console.log(temporaryData);

  const onSubmit = handleSubmit(async data => {
    const res = await promiseGenerator(data);
    goForward(res);
  });

  return (
    <div className={cn("register relative text-black", classname)}>
      <Container className="py-24">
        <div className="header space-y-2">
          <Headline>Регистрация</Headline>
          <p className="font-light">
            Для входа в личный кабинет введите свой номер телефона, на него
            будет отправлено SMS с проверочным кодом
          </p>
        </div>

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
            className="w-full uppercase"
            size={"lg"}
            type="submit"
            disabled={isSubmitting || !isAccepted || !isValid}
          >
            <span className={cn({ invisible: isSubmitting })}>Войти</span>
            {isSubmitting && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default PhoneRegister;
