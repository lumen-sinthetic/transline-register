import { zPhoneNumber } from "@shared/lib/phone/z-phone";
import { useMemo } from "react";
import { UserRole } from "./auth.types";
import z from "zod";

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

export function useUserSchema(role?: UserRole) {
  const schema = useMemo(() => {
    const base = z.object({
      first_name: z
        .string({ error: "Имя обязательно" })
        .nonempty("Имя обязательно"),
      last_name: z
        .string({ error: "Фамилия обязательна" })
        .nonempty("Фамилия обязательна"),
      patronymic: z.string({ error: "Неверное отчество" }).optional(),
      email: z.email({ error: "Неверный Email" }).nonempty("Email обязателен"),
      password: z
        .string({ error: "Пароль обязателен" })
        .min(8, "Пароль должен содеражть минимум 8 символов")
        .regex(
          /^(?=.*\p{L})(?=.*\p{N})[\p{L}\p{N}]+$/u,
          "Пароль должен содержать цифры и буквы латиницы"
        ),
      iin: z
        .string({ error: "ИИН обязателен" })
        .length(12, "ИИН должен содержать 12 символов")
        .optional(),
      bin: z
        .string({ error: "БИН обязателен" })
        .length(12, "БИН должен содержать 12 символов")
        .optional(),
    });

    if (role === "carrier") return base.required({ bin: true });

    return base.required({ iin: true });
  }, [role]);

  return schema;
}
