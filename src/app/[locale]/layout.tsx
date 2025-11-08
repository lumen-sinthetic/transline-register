import PageProgress from "@components/atoms/page-progress";
import IntlProvider from "@core/context/intl-provider";
import { routing } from "@core/locale/i18n/routing";
import { selfURL } from "@shared/env";
import { cn } from "@shared/lib/utils";
import "@shared/styles/globals.scss";
import type { Metadata } from "next";
import { hasLocale, Locale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geologica } from "next/font/google";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["cyrillic", "latin"],
  fallback: ["sans-serif"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersStore = await headers();
  const pathname = headersStore.get("x-pathname");

  return {
    title: "Transline international",
    metadataBase: selfURL ? new URL(selfURL) : null,
    alternates: { canonical: pathname },
  };
}

export const revalidate = 120;

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={cn(
          geologica.className,
          geologica.variable,
          "text-charcoal dark:text-white antialiased"
        )}
      >
        <IntlProvider
          locale={locale}
          messages={messages}
        >
          <PageProgress />
          <Toaster richColors />
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}

export default RootLayout;
