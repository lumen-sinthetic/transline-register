import { Button } from "@components/atoms/button";
import { Container } from "@components/atoms/container";
import CarrierCard from "@components/molecules/register/carrier-card";
import CustomerCard from "@components/molecules/register/customer-card";
import RegisterText from "@components/molecules/register/register-text";
import { useRegisterContext } from "@components/templates/register-progress";
import { UserRole } from "@entities/auth/models/auth.types";
import { cn } from "@shared/lib/utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function RolePick({ className }: { className?: string }) {
  const { goForward } = useRegisterContext();
  const [role, setRole] = useState<UserRole>();

  const submitHandler = useCallback(() => {
    if (!role) {
      toast.error("Роль не выбрана");
      return;
    }
    goForward({ role });
  }, [role]);

  return (
    <div className={cn("register-phone", className)}>
      <Container className="py-24 space-y-8">
        <RegisterText
          title="Регистрация"
          description="Выберите, как вы хотите использовать приложение"
        />

        <div className="flex flex-col gap-4">
          <CustomerCard
            onClick={() => setRole("customer")}
            className={cn("outline-primary", {
              "outline-2 outline": role === "customer",
            })}
          />

          <CarrierCard
            onClick={() => setRole("carrier")}
            className={cn("outline-primary", {
              "outline-2 outline": role === "carrier",
            })}
          />
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
