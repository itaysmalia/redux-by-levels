import { toArrayIfNeeded, useValue } from "../";

export const useRBLRootValue = level => {
  const levels = toArrayIfNeeded(level);
  return useValue(levels);
};
