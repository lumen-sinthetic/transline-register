import { Headline } from "@components/atoms/headline";
import Download from "@components/atoms/icons/download";
import Luggage from "@components/atoms/icons/luggage";
import Truck from "@components/atoms/icons/truck";
import CurvedLine from "@components/atoms/svg/curved-line";
import { cn } from "@shared/lib/utils";
import { useTranslations } from "next-intl";
import { MouseEventHandler } from "react";

interface CardProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function CustomerCard({ className, onClick }: CardProps) {
  const t = useTranslations("register.roles.customer");

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg p-3 flex gap-2 overflow-hidden transition-all w-fit",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-52">
        <div className="bg-primary-faint grid place-items-center rounded-xl size-11">
          <Luggage />
        </div>
        <Headline
          size={"sm"}
          as="h3"
        >
          {t("title")}
        </Headline>
        <p className="text-sm text-charcoal-400">{t("description")}</p>
      </div>

      <div className="relative w-28">
        <CurvedLine className="left-1/2 translate-x-1/2 -mt-3" />

        <div
          className={cn(
            "bg-primary-faint size-9 grid place-items-center rounded-full",
            "absolute top-0 left-1/2 -translate-x-1/2"
          )}
        >
          <Truck className="h-4 w-fit text-primary" />
        </div>

        <div
          className={cn(
            "bg-primary-faint size-9 grid place-items-center rounded-full",
            "absolute bottom-4 left-[calc(50%+5px)] -translate-x-1/2"
          )}
        >
          <Download className="h-5 w-fit text-primary" />
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
