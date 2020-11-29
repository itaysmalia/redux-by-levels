import { AnyAction } from 'redux'
import { StringOrNumber } from './rbl-level'
export type RBLAction = {
  payload?: {
    levels: StringOrNumber[]
    value: any
  }
} & AnyAction
