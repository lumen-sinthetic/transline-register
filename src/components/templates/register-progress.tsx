"use client";

import OtpCheck from "@components/organisms/register/otp-check";
import PhoneRegister from "@components/organisms/register/phone-register";
import RolePick from "@components/organisms/register/role-pick";
import { RegisterData } from "@entities/auth/models/auth.types";
import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useState } from "react";

interface ContextProps {
  temporaryData: RegisterData;
  goForward: (data?: RegisterData) => void;
  saveTemporaryData: (data: RegisterData) => void;
}

const RegisterContext = createContext<ContextProps>({
  temporaryData: {},
  goForward: () => {},
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

  const saveTemporaryData = useCallback((data: RegisterData) => {
    const previousData: RegisterData = JSON.parse(
      Cookies.get("x-register-data") || "{}"
    );

    Cookies.set(
      "x-register-data",
      JSON.stringify({ ...previousData, ...data }),
      { expires: 60 * 60 * 24 }
    );
  }, []);

  const goForward = useCallback(
    (data?: RegisterData) => {
      if (data) saveTemporaryData(data);

      setCurrentStep(prev => {
        const res = prev + 1;
        Cookies.set("x-register-step", res.toString(), {
          expires: 60 * 60 * 24, // 1 day
        });
        return res;
      });
    },
    [setCurrentStep, saveTemporaryData]
  );

  // TODO: add flowing animation
  return (
    <RegisterContext.Provider
      value={{
        goForward,
        saveTemporaryData,
        temporaryData: temporaryRegisterData,
      }}
    >
      <div className="basis-1/2">
        {currentStep === 1 && <PhoneRegister />}
        {currentStep === 2 && <RolePick />}
        {currentStep === 3 && <OtpCheck />}
      </div>
    </RegisterContext.Provider>
  );
}

export default RegisterProgress;
