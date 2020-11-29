import React, { useState } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { getRBLReducer } from '..'
import { RBLProvider } from '../providers'
import { useSyncRBL } from './useSyncRBL'

interface onlyChildrenProps {
  children: React.ReactChildren
}

describe('testing useSyncRBL hook', () => {
  it('should sync a state with the global state', () => {
    const store = createStore(getRBLReducer({ a: {} }))
    const useSyncedCount = () => {
      const [count, setCount] = useState<number>(0)
      useSyncRBL(count, 'b')
      return { setCount }
    }
    const wrapper = ({ children }: onlyChildrenProps): React.ReactElement => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>{children}</RBLProvider>
        </Provider>
      )
    }

    const { result } = renderHook(() => useSyncedCount(), {
      wrapper
    })
    act(() => {
      result.current.setCount((c: number) => {
        return c + 1
      })
    })

    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: 1 } })
  })
})
