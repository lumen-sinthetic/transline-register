import { cn } from "@shared/lib/utils";
import * as React from "react";

interface HeadlessTextareaProps extends React.ComponentProps<"textarea"> {
  isError?: boolean;
}

const HeadlessTextarea = React.forwardRef<
  HTMLTextAreaElement,
  HeadlessTextareaProps
>(({ className, isError, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
        { "!outline outline-1 outline-red-500": isError }
      )}
      ref={ref}
      {...props}
    />
  );
});

HeadlessTextarea.displayName = "HeadlessTextarea";

export { HeadlessTextarea };
