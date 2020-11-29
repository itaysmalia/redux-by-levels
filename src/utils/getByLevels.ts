import { path } from 'ramda'
import { StringOrNumber } from '../types'

export const getByLevels = (obj: any, levels: StringOrNumber[]) => {
  return path(levels, obj)
}
