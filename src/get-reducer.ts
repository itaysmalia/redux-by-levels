import { Reducer } from 'redux'
import { RBLAction } from './types'
import { getByLevels, setByLevels } from './utils'

const defaultAction = {
  type: 'DEFAULT',
  payload: {
    levels: [],
    value: ''
  }
}

export const getRBLReducer = (
  initialState: any = {},
  levelsAfterRoot: number = 0
) => {
  const reducer: Reducer = (
    state: any = initialState,
    action: RBLAction = defaultAction
  ) => {
    const levels = action?.payload?.levels?.slice(levelsAfterRoot)
    if (levels) {
      const value = action?.payload?.value
      const valueToSet =
        typeof value === 'function' ? value(getByLevels(state, levels)) : value
      return setByLevels(state, levels, valueToSet)
    }
    return state
  }
  return reducer
}
