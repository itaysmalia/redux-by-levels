import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { StringOrNumber } from '../../types'
import { getByLevels } from '../getByLevels'

export const useValue = (levels: StringOrNumber[] = []) => {
  const selectorCallback = useCallback((state) => getByLevels(state, levels), [
    levels
  ])
  const value = useSelector(selectorCallback)
  return value
}
