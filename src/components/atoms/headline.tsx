import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headlineSizes = cva("", {
  variants: {
    size: {
      none: "",
      xs: "text-2xs lg:text-xs",
      sm: "text-base sm:text-lg 3xl:text-xl",
      "semi-sm": "text-lg lg:text-2xl 2xl:text-xl",
      md: "text-2xl sm:text-3xl 2xl:text-3xl",
      lg: "text-[24px] sm:text-[32px] lg:text-[50px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface HeadlineProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headlineSizes> {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
}

const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ as: Tag = "h2", size, className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;

    return (
      <Comp
        ref={ref}
        className={cn(headlineSizes({ size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Headline.displayName = "Headline";

export { Headline };
