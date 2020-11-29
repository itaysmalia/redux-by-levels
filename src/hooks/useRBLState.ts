import { useRBLSetter } from './useRBLSetter'
import { useRBLValue } from '..'
import { RBLLevel } from '../types'

export const useRBLState = (level?: RBLLevel): [any, Function] => [
  useRBLValue(level),
  useRBLSetter(level)
]
