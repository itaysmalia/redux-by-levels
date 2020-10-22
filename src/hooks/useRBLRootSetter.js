import { toArrayIfNeeded, useValueSetter } from "../";

export const useRBLRootSetter = level => {
  const levels = toArrayIfNeeded(level);
  return useValueSetter(levels);
};
