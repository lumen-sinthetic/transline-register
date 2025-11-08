import "next-intl";

import { routing } from "./i18n/routing";
type BaseMessages = typeof import("./messages/ru/base.json");
type RegisterMessages = typeof import("./messages/ru/register.json");
type DashboardMessages = typeof import("./messages/ru/dashboard.json");

interface IntlMessages
  extends BaseMessages,
    RegisterMessages,
    DashboardMessages {}

declare module "next-intl" {
  interface AppConfig {
    Messages: IntlMessages;
    Locale: (typeof routing.locales)[number];
  }
}
