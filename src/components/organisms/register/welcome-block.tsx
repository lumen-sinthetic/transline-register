"use client";

import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import Logo from "@components/atoms/icons/logo";
import { cn } from "@shared/lib/utils";
import { useTranslations } from "next-intl";

function WelcomeBlock({ className }: { className?: string }) {
  const t = useTranslations("register");

  return (
    <div
      className={cn(
        "welcome",
        "relative h-full bg-primary text-mostly-white",
        className
      )}
    >
      <Container className="space-y-5">
        <Logo />

        <Headline
          as="h1"
          size={"lg"}
        >
          {t("welcome")}
        </Headline>
      </Container>
    </div>
  );
}

export default WelcomeBlock;
