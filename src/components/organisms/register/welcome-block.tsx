import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import Logo from "@components/atoms/icons/logo";
import { cn } from "@shared/lib/utils";

function WelcomeBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "welcome",
        "relative h-full bg-primary text-white",
        className
      )}
    >
      <Container className="space-y-5">
        <Logo />

        <Headline
          as="h1"
          size={"lg"}
        >
          Добро пожаловать в личный кабинет для бизнеса!
        </Headline>
      </Container>
    </div>
  );
}

export default WelcomeBlock;
