"use client";

import OtpCheck from "@components/organisms/register/otp-check";
import PhoneRegister from "@components/organisms/register/phone-register";
import RolePick from "@components/organisms/register/role-pick";
import UserForm from "@components/organisms/register/user-form";
import { RegisterData } from "@entities/auth/models/auth.types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

interface ContextProps {
  temporaryData: RegisterData;
  goForward: (data?: RegisterData) => void;
  finish: (data?: RegisterData) => void;
  saveTemporaryData: (data: RegisterData) => void;
}

const RegisterContext = createContext<ContextProps>({
  temporaryData: {},
  goForward: () => {},
  finish: () => {},
  saveTemporaryData: () => {},
});

export const useRegisterContext = () => useContext(RegisterContext);

interface RegisterProgressProps {
  step: number;
  temporaryRegisterData: object;
}

function RegisterProgress({
  step,
  temporaryRegisterData,
}: RegisterProgressProps) {
  const [currentStep, setCurrentStep] = useState(step);
  const [temporaryData, setTemporaryData] = useState(temporaryRegisterData);
  const router = useRouter();

  const saveTemporaryData = useCallback((data: RegisterData) => {
    const previousData: RegisterData = JSON.parse(
      Cookies.get("x-register-data") || "{}"
    );

    setTemporaryData({ ...previousData, ...data });

    Cookies.set(
      "x-register-data",
      JSON.stringify({ ...previousData, ...data }),
      { expires: 1 }
    );
  }, []);

  const goForward = useCallback(
    (data?: RegisterData) => {
      if (data) saveTemporaryData(data);

      setCurrentStep(prev => {
        const res = prev + 1;
        Cookies.set("x-register-step", res.toString(), { expires: 1 });
        return res;
      });
    },
    [setCurrentStep, saveTemporaryData]
  );

  const finish = useCallback(
    (data?: RegisterData) => {
      const finalData: RegisterData = { ...temporaryData, ...data };
      localStorage.setItem("user", JSON.stringify(finalData));
      Cookies.remove("x-register-data");
      Cookies.remove("x-register-step");
      Cookies.set("is-auth", "true", { expires: 365 });
      router.push("/profile");
    },
    [temporaryData]
  );

  // TODO: add flowing animation
  return (
    <RegisterContext.Provider
      value={{
        finish,
        goForward,
        saveTemporaryData,
        temporaryData,
      }}
    >
      <div className="basis-1/2">
        {currentStep === 1 && <PhoneRegister />}
        {currentStep === 2 && <RolePick />}
        {currentStep === 3 && <OtpCheck />}
        {currentStep === 4 && <UserForm />}
      </div>
    </RegisterContext.Provider>
  );
}

export default RegisterProgress;
