import { useMemo } from "react";

import {
  Archive,
  BookOpen,
  ClipboardList,
  Truck,
  UserCircle,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarItem {
  label: string;
  icon: LucideIcon;
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
            icon: ClipboardList,
            isActive: true,
          },
          {
            label: t("applications.items.archived"),
            icon: Archive,
          },
        ],
      },
      {
        title: t("counterparties.title"),
        items: [
          {
            label: t("counterparties.items.customers"),
            icon: UserCircle,
          },
          {
            label: t("counterparties.items.carriers"),
            icon: Users,
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
            icon: UserCog,
          },
        ],
      },
    ],
    [t]
  );

  return { dashboardLinks };
}
