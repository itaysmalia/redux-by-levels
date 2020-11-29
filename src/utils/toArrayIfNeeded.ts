import { RBLLevel } from '../types'
export const toArrayIfNeeded = (stringOrArray?: RBLLevel) => {
  if (Array.isArray(stringOrArray)) {
    return stringOrArray
  } else {
    if (stringOrArray !== undefined && stringOrArray !== null) {
      return [stringOrArray]
    } else {
      return []
    }
  }
}
