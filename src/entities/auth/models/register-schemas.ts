import { zPhoneNumber } from "@shared/lib/phone/z-phone";
import { useMemo } from "react";
import { UserRole } from "./auth.types";
import z from "zod";
import { useTranslations } from "next-intl";

export function usePhoneSchema() {
  const t = useTranslations("common.validation");

  const schema = useMemo(
    () =>
      z.object({
        phone_number: zPhoneNumber({
          requiredMessage: t("phone_number.required"),
          invalidMessage: t("phone_number.invalid"),
        }),
      }),
    [t]
  );

  return schema;
}

export function useOtpSchema() {
  const t = useTranslations("common.validation");

  const schema = useMemo(
    () =>
      z.object({
        otp: z.string({ message: t("otp.invalid") }).length(6, t("otp.length")),
      }),
    [t]
  );

  return schema;
}

export function useUserSchema(role?: UserRole) {
  const t = useTranslations("common.validation");

  const schema = useMemo(() => {
    const base = z.object({
      first_name: z
        .string({ error: t("first_name.required") })
        .nonempty(t("first_name.required")),
      last_name: z
        .string({ error: t("last_name.required") })
        .nonempty(t("last_name.required")),
      patronymic: z.string({ error: t("patronymic.invalid") }).optional(),
      email: z
        .email({ error: t("email.invalid") })
        .nonempty(t("email.required")),
      password: z
        .string({ error: t("password.required") })
        .min(8, t("password.min"))
        .regex(/^(?=.*\p{L})(?=.*\p{N})[\p{L}\p{N}]+$/u, t("password.regex")),
      iin: z
        .string({ error: t("iin.required") })
        .length(12, t("iin.length"))
        .optional(),
      bin: z
        .string({ error: t("bin.required") })
        .length(12, t("bin.length"))
        .optional(),
    });

    if (role === "customer") return base.required({ bin: true });

    return base.required({ iin: true });
  }, [role, t]);

  return schema;
}
