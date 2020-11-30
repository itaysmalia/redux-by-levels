import React from 'react'
import { RBLContext } from '../../redux-by-levels-context'

import { RBLLevel } from '../../types'
import { toArrayIfNeeded } from '../../utils'

interface RBLProviderProps {
  children?: React.ReactNode
  level?: RBLLevel
}

export const RBLProvider = ({ children, level = [] }: RBLProviderProps) => {
  const levelsToAppend = toArrayIfNeeded(level)
  const levels = React.useContext(RBLContext) || []
  return (
    <RBLContext.Provider value={[...levels, ...levelsToAppend]}>
      {children}
    </RBLContext.Provider>
  )
}
