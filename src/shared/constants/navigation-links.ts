import { ComponentProps, FC, useMemo } from "react";

import OpenFolder from "@components/atoms/icons/dashboard/open-folder";
import PaperCheck from "@components/atoms/icons/dashboard/paper-check";
import Users from "@components/atoms/icons/dashboard/users";
import { BookOpen, SquareUser, Truck, UserLock } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarItem {
  label: string;
  icon: FC<ComponentProps<"svg">>;
  isActive?: boolean;
  hasCaret?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export function useNaigationLinks() {
  const t = useTranslations("dashboard.menu.sections");

  const dashboardLinks: SidebarSection[] = useMemo(
    () => [
      {
        title: t("applications.title"),
        items: [
          {
            label: t("applications.items.active"),
            icon: PaperCheck,
            isActive: true,
          },
          {
            label: t("applications.items.archived"),
            icon: OpenFolder,
          },
        ],
      },
      {
        title: t("counterparties.title"),
        items: [
          {
            label: t("counterparties.items.customers"),
            icon: Users,
          },
          {
            label: t("counterparties.items.carriers"),
            icon: UserLock,
          },
        ],
      },
      {
        title: t("fleet.title"),
        items: [
          {
            label: t("fleet.items.vehicles"),
            icon: Truck,
          },
        ],
      },
      {
        title: t("management.title"),
        items: [
          {
            label: t("management.items.directories"),
            icon: BookOpen,
            hasCaret: true,
          },
          {
            label: t("management.items.managers"),
            icon: SquareUser,
          },
        ],
      },
    ],
    [t]
  );

  return { dashboardLinks };
}
