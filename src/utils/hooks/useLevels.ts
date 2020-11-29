import { RBLLevel, StringOrNumber } from './../../types/rbl-level'
import { useContext, useMemo } from 'react'
import { RBLContext } from '../..'
import { toArrayIfNeeded } from '../toArrayIfNeeded'

export const useLevels = (level: RBLLevel = []) => {
  const levelsToAppend = toArrayIfNeeded(level)
  const contextLevels: StringOrNumber[] =
    useContext<StringOrNumber[]>(RBLContext) || []
  const levels = useMemo(() => [...contextLevels, ...levelsToAppend], [
    contextLevels,
    levelsToAppend
  ])
  return levels
}
