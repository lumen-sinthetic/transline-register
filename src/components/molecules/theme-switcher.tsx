"use client";

import { cn } from "@shared/lib/utils";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
  darker?: boolean;
}

function ThemeSwitcher({ className, darker }: ThemeSwitcherProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        type="button"
        className={cn(
          "size-9 text-white lg:text-primary dark:text-charcoal-400",
          "grid place-items-center",
          { "text-primary": !darker }
        )}
        onClick={() => document.documentElement.classList.remove("dark")}
      >
        <Sun className="size-5" />
      </button>

      <button
        type="button"
        className={cn(
          "size-9 text-charcoal-400 dark:text-white",
          "grid place-items-center"
        )}
        onClick={() => document.documentElement.classList.add("dark")}
      >
        <Moon className="size-5" />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
