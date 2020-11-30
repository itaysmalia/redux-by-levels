import { RBLLevel } from './../types/rbl-level'
import { useRBLRootSetter, useRBLRootValue } from '.'

export const useRBLRootState = (
  level?: RBLLevel
): [any, (value: any, level?: RBLLevel) => void] => [
  useRBLRootValue(level),
  useRBLRootSetter(level)
]
