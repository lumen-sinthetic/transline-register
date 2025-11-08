import { Button } from "@components/atoms/button";
import { Container } from "@components/atoms/container";
import CarrierCard from "@components/molecules/register/carrier-card";
import CustomerCard from "@components/molecules/register/customer-card";
import RegisterText from "@components/molecules/register/register-text";
import { useRegisterContext } from "@components/templates/register-progress";
import { UserRole } from "@entities/auth/models/auth.types";
import { cn } from "@shared/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function RolePick({ className }: { className?: string }) {
  const { goForward } = useRegisterContext();
  const [role, setRole] = useState<UserRole>();
  const t = useTranslations();
  // const animationref = useStepAnimation<HTMLDivElement>(2, activeStep);

  const submitHandler = useCallback(() => {
    if (!role) {
      toast.error(t("register.roles.not-chosen"));
      return;
    }
    goForward({ role });
  }, [role]);

  return (
    <div className={cn("register-phone pb-24 lg:pb-0", className)}>
      <Container className="space-y-8">
        <RegisterText
          title={t("register.register")}
          description={t("register.roles.description")}
        />

        <div className="flex flex-wrap gap-4">
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
          {t("common.forms.continue")}
        </Button>
      </Container>
    </div>
  );
}

export default RolePick;
