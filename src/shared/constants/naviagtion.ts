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

// TODO: Add custom icons and translations

export function useNaigationLinks() {
  const dashboardLinks: SidebarSection[] = useMemo(
    () => [
      {
        title: "заявки",
        items: [
          {
            label: "Активные",
            icon: ClipboardList,
            isActive: true,
          },
          {
            label: "Архивные",
            icon: Archive,
          },
        ],
      },
      {
        title: "контрагенты",
        items: [
          {
            label: "Заказчики",
            icon: UserCircle,
          },
          {
            label: "Перевозчики",
            icon: Users,
          },
        ],
      },
      {
        title: "автопарк",
        items: [
          {
            label: "Транспорт",
            icon: Truck,
          },
        ],
      },
      {
        title: "управление",
        items: [
          {
            label: "Справочники",
            icon: BookOpen,
            hasCaret: true,
          },
          {
            label: "Менеджеры",
            icon: UserCog,
          },
        ],
      },
    ],
    []
  );

  return { dashboardLinks };
}
