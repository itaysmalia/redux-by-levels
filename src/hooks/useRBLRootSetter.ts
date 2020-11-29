import { RBLLevel } from './../types/rbl-level'
import { toArrayIfNeeded, useValueSetter } from '..'

export const useRBLRootSetter = (level?: RBLLevel) => {
  const levels = toArrayIfNeeded(level)
  return useValueSetter(levels)
}
