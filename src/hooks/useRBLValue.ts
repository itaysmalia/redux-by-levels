import { RBLLevel } from '../types'
import { useLevels, useValue } from '../utils'

export const useRBLValue = (level?: RBLLevel): any => {
  const levels = useLevels(level)
  return useValue(levels)
}
