import { zPhoneNumber } from "@shared/lib/phone/z-phone";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import z from "zod";

export function useUserEditSchema() {
  const t = useTranslations("common.validation");

  const schema = useMemo(
    () =>
      z.object({
        phone_number: zPhoneNumber({
          requiredMessage: t("phone_number.required"),
          invalidMessage: t("phone_number.invalid"),
        }),
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
      }),
    [t]
  );

  return schema;
}
