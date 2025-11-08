import { getRequestConfig } from "next-intl/server";
import { hasLocale, Locale } from "next-intl";
import { routing } from "./routing";

async function getIntlMessages(locale: Locale, ...keys: string[]) {
  const messages = await Promise.all(
    keys.map(key => import(`../messages/${locale}/${key}.json`))
  );

  return messages.map(mod => mod.default);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const [base, register, dashboard] = await getIntlMessages(
    locale,
    "base",
    "register",
    "dashboard"
  );

  return {
    locale,
    messages: { ...base, ...register, ...dashboard },
  };
});
