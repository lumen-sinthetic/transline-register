import { zPhoneNumber } from "@shared/lib/phone/z-phone";
import { useMemo } from "react";
import z from "zod";

export function useUserEditSchema() {
  const schema = useMemo(
    () =>
      z.object({
        phone_number: zPhoneNumber({
          requiredMessage: "Номер телефона обязателен",
          invalidMessage: "Некорректный номер телефона",
        }),
        first_name: z
          .string({ error: "Имя обязательно" })
          .nonempty("Имя обязательно"),
        last_name: z
          .string({ error: "Фамилия обязательна" })
          .nonempty("Фамилия обязательна"),
        patronymic: z.string({ error: "Неверное отчество" }).optional(),
        email: z
          .email({ error: "Неверный Email" })
          .nonempty("Email обязателен"),
      }),
    []
  );

  return schema;
}
