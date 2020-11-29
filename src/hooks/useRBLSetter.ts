import { RBLLevel } from '../types'
import { useLevels, useValueSetter } from '../utils'

export const useRBLSetter = (
  level?: RBLLevel
): ((value: any, level?: RBLLevel) => void) => {
  const levels = useLevels(level)
  return useValueSetter(levels)
}
