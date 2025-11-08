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
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";

function UserForm() {
  const { temporaryData, finish } = useRegisterContext();
  const schema = useUserSchema(temporaryData.role);
  // const animationref = useStepAnimation<HTMLDivElement>(4, activeStep);

  const t = useTranslations("common.forms");

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
    <div className="user-form pb-24 lg:pb-0">
      <Container>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <Input
            {...register("last_name")}
            error={errors.last_name?.message}
            placeholder={`${t("labels.first_name")}*`}
          />
          <Input
            {...register("first_name")}
            error={errors.first_name?.message}
            placeholder={`${t("labels.last_name")}*`}
          />
          <Input
            {...register("patronymic")}
            error={errors.patronymic?.message}
            placeholder="Очество"
          />
          <Input
            {...register("email")}
            error={errors.email?.message}
            placeholder={`${t("labels.email")}*`}
          />
          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
            placeholder={`${t("labels.password")}*`}
            autoComplete="current-password"
          />

          {temporaryData.role === "customer" ? (
            <Input
              {...register("bin")}
              error={errors.bin?.message}
              placeholder={`${t("labels.bin")}*`}
            />
          ) : (
            <Input
              {...register("iin")}
              error={errors.iin?.message}
              placeholder={`${t("labels.iin")}*`}
            />
          )}

          <Button
            className="w-full uppercase relative"
            size={"lg"}
            type="submit"
            disabled={isSubmitting}
          >
            <span className={cn({ invisible: isSubmitting })}>
              {t("log-in")}
            </span>
            {isSubmitting && <Loader2 className="animate-spin absolute" />}
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default UserForm;
