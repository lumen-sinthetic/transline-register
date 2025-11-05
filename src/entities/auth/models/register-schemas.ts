import { zPhoneNumber } from "@shared/lib/phone/z-phone";
import { useMemo } from "react";
import z from "zod/v3";

export function usePhoneSchema() {
  const schema = useMemo(
    () =>
      z.object({
        phone_number: zPhoneNumber({
          requiredMessage: "Номер телефона обязателен",
          invalidMessage: "Некорректный номер телефона",
        }),
      }),
    []
  );

  return schema;
}

export function useOtpSchema() {
  const schema = useMemo(
    () =>
      z.object({
        otp: z
          .string({ message: "Некорректный код" })
          .length(6, "Необходимая длина - 6 символов"),
      }),
    []
  );

  return schema;
}
