import * as React from "react";

import { cn } from "@shared/lib/utils";

interface HeadlessInputProps extends React.ComponentProps<"input"> {
  isError?: boolean;
}

const HeadlessInput = React.forwardRef<HTMLInputElement, HeadlessInputProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-12 w-full rounded-lg border border-input dark:border-mostly-white bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          { "!outline outline-1 outline-red-500 ring-red-500": isError }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

HeadlessInput.displayName = "HeadlessInput";

export { HeadlessInput };
