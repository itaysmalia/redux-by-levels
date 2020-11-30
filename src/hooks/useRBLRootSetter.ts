import { toArrayIfNeeded, useValueSetter } from '../utils'
import { RBLLevel } from './../types/rbl-level'

export const useRBLRootSetter = (level?: RBLLevel) => {
  const levels = toArrayIfNeeded(level)
  return useValueSetter(levels)
}
