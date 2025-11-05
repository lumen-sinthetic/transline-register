import { Button } from "@components/atoms/button";
import { Container } from "@components/atoms/container";
import RegisterText from "@components/molecules/register/register-text";
import { useRegisterContext } from "@components/templates/register-progress";
import { cn } from "@shared/lib/utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function RolePick({ className }: { className?: string }) {
  const { goForward } = useRegisterContext();
  const [role, setRole] = useState<"customer" | "carrier">();

  const submitHandler = useCallback(() => {
    if (!role) {
      toast.error("роль не выбрана");
      return;
    }
    // saveTemporaryData({ role });
    goForward({ role });
  }, [role]);

  return (
    <div className={cn("register-phone", className)}>
      <Container className="py-24">
        <RegisterText
          title="Регистрация"
          description="Выберите, как вы хотите использовать приложение"
        />
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={cn({ "text-primary": role === "carrier" })}
            onClick={() => setRole("carrier")}
          >
            перевозчик
          </button>

          <button
            type="button"
            className={cn({ "text-primary": role === "customer" })}
            onClick={() => setRole("customer")}
          >
            заказчик
          </button>
        </div>

        <Button
          disabled={!role}
          size={"lg"}
          onClick={submitHandler}
        >
          Продолжить
        </Button>
      </Container>
    </div>
  );
}

export default RolePick;
