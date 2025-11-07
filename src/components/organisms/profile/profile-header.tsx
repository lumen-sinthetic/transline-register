"use client";

import { Headline } from "@components/atoms/headline";
import Menu from "@components/atoms/icons/menu";
import { useDashboardContext } from "@shared/context/dashboard.context";
import { cn } from "@shared/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

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
        <Headline className="uppercase">transline</Headline>
      </div>

      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => setActiveUserMenu(prev => !prev)}
      >
        <Image
          src={"/assets/img/placeholder.svg"}
          alt="placeholder"
          width={32}
          height={32}
          className="rounded-full"
        />

        <ChevronDown
          className={cn("stroke-gray-500 w-4 transition-transform", {
            "rotate-180": activeUserMenu,
          })}
        />
      </button>
    </header>
  );
}

export default ProfileHeader;
