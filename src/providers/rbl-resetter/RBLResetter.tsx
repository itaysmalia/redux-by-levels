import React from 'react'
import { RBLContext } from '../..'

interface RBLResetterProps {
	children?: React.ReactNode
}

export const RBLResetter: React.FunctionComponent<RBLResetterProps> = ({
	children
}) => {
	return <RBLContext.Provider value={[]}>{children}</RBLContext.Provider>
}
