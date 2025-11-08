"use client";

import { useRouter } from "next/navigation";
import { DashboardContext } from "./dashboard.context";
import { PropsWithChildren, useCallback, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

function DashboardProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const t = useTranslations("dashboard");

  const [activeMenu, setActiveMenu] = useState(true);
  const [activeUserMenu, setActiveUserMenu] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    Cookies.remove("is-auth");
    router.push("/register");
    toast.success(t("logout-success"));
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        activeUserMenu,
        setActiveUserMenu,
        logout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
