"use client";

import { Headline } from "@components/atoms/headline";
import Menu from "@components/atoms/icons/menu";
import LangSwitcher from "@components/molecules/lang-switcher";
import { useDashboardContext } from "@shared/context/dashboard.context";
import { cn } from "@shared/lib/utils";
import { ChevronDown, User } from "lucide-react";

function ProfileHeader() {
  const { setActiveMenu, setActiveUserMenu, activeUserMenu } =
    useDashboardContext();

  return (
    <header className="fixed inset-x-0 top-0 h-14 py-2 pl-4 pr-5 bg-mostly-white border-b flex items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setActiveMenu(prev => !prev)}
          className="p-4"
        >
          <Menu />
        </button>
        <Headline
          size={"sm"}
          className="uppercase font-sf-pro font-semibold tracking-[1%]"
        >
          transline
        </Headline>
      </div>

      <div className="flex gap-2">
        <LangSwitcher className="gap-1" />
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => setActiveUserMenu(prev => !prev)}
        >
          <div className="bg-white rounded-full size-8 grid place-items-center text-charcoal-400">
            <User className="size-5" />
          </div>

          <ChevronDown
            className={cn("stroke-gray-500 w-4 transition-transform", {
              "rotate-180": activeUserMenu,
            })}
          />
        </button>
      </div>
    </header>
  );
}

export default ProfileHeader;
