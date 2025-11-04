import "next-intl";

import { routing } from "./i18n/routing";
type BaseMessages = typeof import("./messages/ru/base.json");

interface IntlMessages extends BaseMessages {}

declare module "next-intl" {
  interface AppConfig {
    Messages: IntlMessages;
    Locale: (typeof routing.locales)[number];
  }
}
