import React from 'react'
import empty from 'empty'
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
}) => {
	const levelsToAppend = toArrayIfNeeded(level)
	const levels = React.useContext(RBLContext) || empty.array
	return (
		<RBLContext.Provider value={[...levels, ...levelsToAppend]}>
			{children}
		</RBLContext.Provider>
	)
}
