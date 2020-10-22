import { useRBLRootSetter, useRBLRootValue } from "../";

export const useRBLRootState = level => [useRBLRootValue(level), useRBLRootSetter(level)];
