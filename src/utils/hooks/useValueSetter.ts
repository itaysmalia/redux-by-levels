import { RBLLevel, StringOrNumber } from './../../types/rbl-level'
import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toArrayIfNeeded } from '..'

export const useValueSetter = (levels: StringOrNumber[]) => {
  const dispatch = useDispatch()
  const prevValue = useRef()
  const setValue = useCallback(
    (value: any, level?: RBLLevel) => {
      if (prevValue.current !== value) {
        prevValue.current = value
        const levelsToUpdate =
          level !== null && level !== undefined
            ? [...levels, ...toArrayIfNeeded(level)]
            : levels
        dispatch({
          type: levels.join('_'),
          payload: { levels: levelsToUpdate, value }
        })
      }
    },
    [dispatch, levels]
  )
  return setValue
}
