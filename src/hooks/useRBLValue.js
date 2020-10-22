import { useValue, useLevels } from "../";

export const useRBLValue = level => {
  const levels = useLevels(level);
  return useValue(levels);
};
