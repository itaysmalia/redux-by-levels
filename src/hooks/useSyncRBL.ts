import { useEffect } from 'react'
import { useRBLSetter } from '..'
import { RBLLevel } from '../types'

export const useSyncRBL = (value: any, level: RBLLevel) => {
  const setValue = useRBLSetter(level)
  return useEffect(() => {
    setValue(value)
  }, [setValue, value])
}
