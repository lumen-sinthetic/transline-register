import { cn } from "@shared/lib/utils";
import { ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

export function Container({ disabled, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn({ "mx-auto px-16": !disabled }, className)}
      {...props}
    />
  );
}
