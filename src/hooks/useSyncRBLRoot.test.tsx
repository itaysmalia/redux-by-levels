import React, { useState } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { getRBLReducer } from '..'
import { RBLProvider } from '../providers'
import { useSyncRBLRoot } from './useSyncRBLRoot'

interface onlyChildrenProps {
  children: React.ReactChildren
}

describe('testing useSyncRBL hook', () => {
  it('should sync a state with the global state', () => {
    const store = createStore(getRBLReducer({ a: { b: { c: { d: null } } } }))
    const useSyncedCount = () => {
      const [count, setCount] = useState<number>(0)
      useSyncRBLRoot(count, 'e')
      return { setCount }
    }
    const wrapper = ({ children }: onlyChildrenProps): React.ReactElement => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>
            <RBLProvider level='b'>
              <RBLProvider level='c'>
                <RBLProvider level='d'>{children}</RBLProvider>
              </RBLProvider>
            </RBLProvider>
          </RBLProvider>
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
    expect(state).toStrictEqual({ a: { b: { c: { d: null } } }, e: 1 })
  })
})
