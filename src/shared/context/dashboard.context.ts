"use client";

import { StateFn } from "@shared/types";
import { createContext, useContext } from "react";

interface DashboardContextProps {
  activeMenu: boolean;
  setActiveMenu: StateFn<boolean>;
  activeUserMenu: boolean;
  setActiveUserMenu: StateFn<boolean>;
  logout: () => void;
}

export const DashboardContext = createContext<DashboardContextProps>({
  activeMenu: false,
  setActiveMenu: () => {},
  activeUserMenu: false,
  setActiveUserMenu: () => {},
  logout: () => {},
});

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);

  if (!ctx) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }

  return ctx;
}
