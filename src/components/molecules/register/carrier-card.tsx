import { Headline } from "@components/atoms/headline";
import Truck2 from "@components/atoms/icons/truck-2";
import { cn } from "@shared/lib/utils";
import { MouseEventHandler } from "react";

interface CardProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function ListLayout({ last }: { last?: boolean }) {
  return (
    <div className="flex gap-3 h-10">
      <div
        className={cn(
          "size-4 border rounded-full border-primary grid place-items-center relative",
          { "border-primary-faint": last }
        )}
      >
        <div
          className={cn("bg-primary rounded-full size-2", {
            "bg-primary-faint": last,
          })}
        />

        {!last && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px bg-primary h-5" />
        )}
      </div>

      <div className="flex flex-col gap-[5px]">
        <div
          className={cn("w-[50px] h-2 bg-primary rounded-full", {
            "bg-primary-faint": last,
          })}
        />
        <div
          className={cn("w-[75px] h-2 bg-primary rounded-full", {
            "bg-primary-faint": last,
          })}
        />
      </div>
    </div>
  );
}

function CarrierCard({ className, onClick }: CardProps) {
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
          <Truck2 />
        </div>
        <Headline
          size={"sm"}
          as="h3"
        >
          как перевозчик
        </Headline>
        <p className="text-sm text-gray-400">
          Получайте актуальную информацию о своих перевозках{" "}
        </p>
      </div>

      <div className="relative w-28 flex flex-col">
        <ListLayout />
        <ListLayout />
        <ListLayout last />
      </div>
    </div>
  );
}

export default CarrierCard;
