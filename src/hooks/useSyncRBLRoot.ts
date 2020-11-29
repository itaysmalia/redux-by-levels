import { useEffect } from 'react'
import { useRBLRootSetter } from '..'
import { RBLLevel } from '../types'

export const useSyncRBLRoot = (value: any, level: RBLLevel) => {
  const setValue = useRBLRootSetter(level)
  return useEffect(() => {
    setValue(value)
  }, [setValue, value])
}
