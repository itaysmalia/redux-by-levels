import React from 'react'

import { RBLContext } from '../..'
import { RBLLevel } from '../../types'
import { toArrayIfNeeded } from '../../utils'

interface RBLProviderProps {
  children?: React.ReactNode
  level?: RBLLevel
}

export const RBLProvider: React.FunctionComponent<RBLProviderProps> = ({
  children,
  level = []
}: RBLProviderProps) => {
  const levelsToAppend = toArrayIfNeeded(level)
  const levels = React.useContext(RBLContext) || []
  return (
    <RBLContext.Provider value={[...levels, ...levelsToAppend]}>
      {children}
    </RBLContext.Provider>
  )
}
