import { useEffect } from 'react'
import { useRBLRootSetter } from '../'

export const useSyncRBLRoot = (value, level) => {
  const setValue = useRBLRootSetter(level)
  return useEffect(() => {
    setValue(value)
  }, [setValue, value])
}
