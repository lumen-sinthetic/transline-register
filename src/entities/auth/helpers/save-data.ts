import { useEffect } from "react";
import { RegisterData } from "../models/auth.types";
import { useRegisterContext } from "@components/templates/register-progress";

export function useSaveOnUnload(data: RegisterData) {
  const { saveTemporaryData } = useRegisterContext();

  useEffect(() => {
    const handle = () => {
      saveTemporaryData(data);
    };

    window.addEventListener("beforeunload", handle);

    return () => window.removeEventListener("beforeunload", handle);
  }, [data, saveTemporaryData]);
}
