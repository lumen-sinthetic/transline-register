import { Button } from "@components/atoms/button";
import { Checkbox } from "@components/atoms/checkbox";
import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import SimplePhoneInput from "@components/molecules/simple-phone-input";
import { cn } from "@shared/lib/utils";
import Link from "next/link";

function PhoneRegister({ classname }: { classname?: string }) {
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

        <form className="space-y-8 my-8">
          <SimplePhoneInput />

          <label className="flex gap-2 items-center">
            <Checkbox />
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
          >
            Войти
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default PhoneRegister;
