import { RBLLevel, StringOrNumber } from './../../types/rbl-level'
import { useContext, useMemo } from 'react'
import { toArrayIfNeeded } from '../toArrayIfNeeded'
import { RBLContext } from '../../redux-by-levels-context'

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
