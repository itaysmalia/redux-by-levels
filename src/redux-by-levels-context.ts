import { createContext } from 'react'
import { StringOrNumber } from './types'

const defaultValue: StringOrNumber[] = []

export const RBLContext = createContext(defaultValue)
