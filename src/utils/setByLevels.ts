import { assocPath, dissocPath } from 'ramda'
import { StringOrNumber } from '../types'

export const setByLevels = (
  obj: object,
  levels: StringOrNumber[],
  value: any
) => {
  return value !== undefined
    ? assocPath(levels, value, obj)
    : dissocPath(levels, obj)
}
