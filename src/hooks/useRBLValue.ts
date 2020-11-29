import { useValue, useLevels } from '..'
import { RBLLevel } from '../types'

export const useRBLValue = (level?: RBLLevel): any => {
  const levels = useLevels(level)
  return useValue(levels)
}
