import { Button } from "@components/atoms/button";
import { Container } from "@components/atoms/container";
import Input from "@components/molecules/input";
import PasswordInput from "@components/molecules/password-input";
import { useRegisterContext } from "@components/templates/register-progress";
import { useSaveOnUnload } from "@entities/auth/helpers/save-data";
import { useUserSchema } from "@entities/auth/models/register-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { cn } from "@shared/lib/utils";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

function UserForm() {
  const { temporaryData, finish } = useRegisterContext();
  const schema = useUserSchema(temporaryData.role);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(schema),
    defaultValues: temporaryData,
  });

  const onSubmit = handleSubmit(async data => {
    const res = await promiseGenerator(data);
    finish(res);
  });

  useSaveOnUnload(watch());

  return (
    <div className="otp-check">
      <Container className="py-24">
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <Input
            {...register("last_name")}
            error={errors.last_name?.message}
            placeholder="Фамилия*"
          />
          <Input
            {...register("first_name")}
            error={errors.first_name?.message}
            placeholder="Имя*"
          />
          <Input
            {...register("patronymic")}
            error={errors.patronymic?.message}
            placeholder="Очество"
          />
          <Input
            {...register("email")}
            error={errors.email?.message}
            placeholder="Email*"
          />
          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
            placeholder="Пароль*"
            autoComplete="current-password"
          />

          {temporaryData.role === "carrier" ? (
            <Input
              {...register("bin")}
              error={errors.bin?.message}
              placeholder="БИН*"
            />
          ) : (
            <Input
              {...register("iin")}
              error={errors.iin?.message}
              placeholder="ИИН*"
            />
          )}

          <Button
            className="w-full uppercase"
            size={"lg"}
            type="submit"
            disabled={isSubmitting}
          >
            <span className={cn({ invisible: isSubmitting })}>Войти</span>
            {isSubmitting && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default UserForm;
