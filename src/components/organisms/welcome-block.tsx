import { Container } from "@components/atoms/container";
import { Headline } from "@components/atoms/headline";
import Logo from "@components/atoms/icons/logo";
import Truck from "@components/atoms/icons/truck";
import { cn } from "@shared/lib/utils";

function WelcomeBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "welcome",
        "relative w-1/2 h-full bg-primary text-white",
        className
      )}
    >
      <Container className="py-24 space-y-5">
        <Logo />

        <Headline
          size={"lg"}
          className="font-semibold"
        >
          Добро пожаловать в личный кабинет для бизнеса!
        </Headline>
      </Container>

      <Truck className="absolute left-16 bottom-24" />
      <div className="w-full bg-white h-1 absolute bottom-16 inset-x-0" />
    </div>
  );
}

export default WelcomeBlock;
