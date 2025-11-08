"use client";

import { usePathname, useRouter } from "@core/locale/i18n/navigation";
import { routing } from "@core/locale/i18n/routing";
import { cn } from "@shared/lib/utils";
import { useLocale } from "next-intl";

interface LangSwitcherProps {
  className?: string;
  textClassName?: string;
  activeTextClassName?: string;
}

function LangSwitcher({
  className,
  textClassName,
  activeTextClassName,
}: LangSwitcherProps) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-2", className)}>
      {routing.locales.map(locale => (
        <button
          key={locale}
          type="button"
          className={cn(
            "text-lg uppercase size-9",
            textClassName,
            { "font-medium text-primary": currentLocale === locale },
            currentLocale === locale && activeTextClassName
          )}
          onClick={() => router.push(pathname, { locale, scroll: false })}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}

export default LangSwitcher;
