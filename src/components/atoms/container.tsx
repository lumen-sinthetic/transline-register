import { cn } from "@shared/lib/utils";
import { ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

export function Container({ disabled, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        { "mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-24": !disabled },
        className
      )}
      {...props}
    />
  );
}
