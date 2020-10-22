import { useRBLSetter } from "./useRBLSetter";
import { useRBLValue } from "../";

export const useRBLState = level => [useRBLValue(level), useRBLSetter(level)];
