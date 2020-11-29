import { toArrayIfNeeded, useValue } from '../utils'
import { RBLLevel } from './../types/rbl-level'

export const useRBLRootValue = (level?: RBLLevel) => {
  const levels = toArrayIfNeeded(level)
  return useValue(levels)
}
