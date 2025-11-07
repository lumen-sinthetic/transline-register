"use client";

import { useRouter } from "next/navigation";
import { DashboardContext } from "./dashboard.context";
import { PropsWithChildren, useCallback, useState } from "react";

function DashboardProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState(true);
  const [activeUserMenu, setActiveUserMenu] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    router.push("/");
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
