import { type Locale as IntlLocale } from "next-intl";
import { ru, kk, enUS, Locale } from "date-fns/locale";
import { routing } from "@core/locale/i18n/routing";

const dateLocales: Record<IntlLocale, Locale> = {
  ru,
  en: enUS,
  kz: kk,
};

export const getDateLocale = (locale: IntlLocale) => {
  return dateLocales[locale] || dateLocales[routing.defaultLocale];
};
