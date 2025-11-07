import { Headline } from "@components/atoms/headline";
import Menu from "@components/atoms/icons/menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

function ProfileHeader() {
  return (
    <header className="fixed inset-x-0 top-0 h-14 py-2 pl-4 pr-5 bg-mostly-white border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu />
        <Headline className="uppercase">transline</Headline>
      </div>

      <div className="flex items-center gap-2">
        <Image
          src={"/assets/img/placeholder.svg"}
          alt="placeholder"
          width={32}
          height={32}
          className="rounded-full"
        />

        <ChevronDown className="stroke-gray-500 w-4" />
      </div>
    </header>
  );
}

export default ProfileHeader;
