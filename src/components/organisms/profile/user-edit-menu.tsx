"use client";

import { Button } from "@components/atoms/button";
import UserField from "@components/molecules/profile/user-field";
import { useUserEditSchema } from "@entities/user/models/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDashboardContext } from "@shared/context/dashboard.context";
import { promiseGenerator } from "@shared/lib/promise-generator";
import { useLocalStorage } from "@shared/lib/storage/local-storage";
import { cn } from "@shared/lib/utils";
import { ChevronRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

function UserEditMenu() {
  const schema = useUserEditSchema();
  const { activeUserMenu, logout } = useDashboardContext();
  const storage = useLocalStorage();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    mode: "onSubmit",
    shouldFocusError: true,
    resolver: zodResolver(schema),
    defaultValues: async () => JSON.parse(storage.getItem("user") || "{}"),
  });

  const onSubmit = handleSubmit(async data => {
    const res = await promiseGenerator(data);
    storage.setItem("user", JSON.stringify(res));
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn("fixed top-14 bottom-0 right-0 w-[520px] border-l", {
        hidden: !activeUserMenu,
      })}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Button
          variant={"primary-outline"}
          type="submit"
          className="relative"
        >
          <span className={cn({ invisible: isSubmitting })}>сохранить</span>
          {isSubmitting && <Loader2 className="animate-spin absolute" />}
        </Button>

        <button
          type="button"
          className="p-2 text-charcoal-400"
          onClick={logout}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="border-t border-dashed" />

      <div className="pb-10">
        <UserField
          label="Фамилия"
          control={control}
          name="last_name"
        />

        <UserField
          label="Имя"
          control={control}
          name="first_name"
        />

        <UserField
          label="Отчество"
          control={control}
          name="patronymic"
        />

        <UserField
          label="Номер телефона"
          name="phone_number"
          control={control}
          type="tel"
        />

        <UserField
          label="Email"
          control={control}
          name="email"
          type="email"
        />
      </div>
    </form>
  );
}

export default UserEditMenu;
