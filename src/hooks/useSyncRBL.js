import { useEffect } from "react";
import { useRBLSetter } from "../";

export const useSyncRBL = (value, level) => {
  const setValue = useRBLSetter(level);
  return useEffect(() => {
    setValue(value);
  }, [setValue, value]);
};
