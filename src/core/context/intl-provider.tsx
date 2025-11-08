"use client";

import { IntlMessages } from "@core/locale/messages";
import { IntlErrorCode, Locale, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface IntlProviderProps {
  children: ReactNode;
  messages: IntlMessages;
  locale: Locale;
}

function IntlProvider({ children, locale, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      getMessageFallback={({ key }) => key}
      timeZone="UTC"
      onError={error => {
        if (error.code === IntlErrorCode.MISSING_MESSAGE) return;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}

export default IntlProvider;
