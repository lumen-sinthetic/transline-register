import { Container } from "@components/atoms/container";
import RegisterText from "@components/molecules/register/register-text";
import { cn } from "@shared/lib/utils";

function RolePick({ className }: { className?: string }) {
  return (
    <div className={cn("register-phone", className)}>
      <Container className="py-24">
        <RegisterText
          title="Регистрация"
          description="Выберите, как вы хотите использовать приложение"
        />
        <div className="flex flex-col gap-2">
          <div className="">Card 1</div>
          <div className="">Card 2</div>
        </div>
      </Container>
    </div>
  );
}

export default RolePick;
