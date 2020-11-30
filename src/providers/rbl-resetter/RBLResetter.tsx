import React from 'react'
import { RBLContext } from '../../redux-by-levels-context'

interface RBLResetterProps {
  children: React.ReactNode
}

export const RBLResetter = ({ children }: RBLResetterProps) => {
  return <RBLContext.Provider value={[]}>{children}</RBLContext.Provider>
}
