import { useLevels, useValueSetter } from "../";

export const useRBLSetter = level => {
  const levels = useLevels(level);
  return useValueSetter(levels);
};
