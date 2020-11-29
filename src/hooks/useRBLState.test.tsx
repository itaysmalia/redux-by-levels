import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'

import { combineReducers, createStore } from 'redux'
import { RBLProvider } from '../providers'
import { getRBLReducer } from '../utils'
import { useRBLState } from './useRBLState'

interface onlyChildrenProps {
  children: React.ReactChildren
}

describe('testing useRBLState hook', () => {
  it('should control simple value', () => {
    const store = createStore(getRBLReducer({ count: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='count'>{children}</RBLProvider>
        </Provider>
      )
    }

    const hook = renderHook(() => useRBLState(), { wrapper })

    expect(hook.result.current[0]).toBe(1)
    act(() => {
      hook.result.current[1](2)
    })
    expect(hook.result.current[0]).toBe(2)
    act(() => {
      hook.result.current[1]((prev: number) => prev + 1)
    })
    expect(hook.result.current[0]).toBe(3)
  })

  it('should add letters', () => {
    const store = createStore(getRBLReducer({ word: '' }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }

    const hook = renderHook(() => useRBLState('word'), { wrapper })

    expect(hook.result.current[0]).toBe('')
    const letters = ['a', 'b', 'c', 'd', 'e']
    letters.forEach((letter) => {
      act(() => {
        hook.result.current[1]((prev: string) => prev + letter)
      })
    })
    expect(hook.result.current[0]).toBe('abcde')
  })

  it('should control first element of array', () => {
    const store = createStore(
      getRBLReducer({ a: { b: { array: [0, 0, 0] }, c: 'd' } })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>{children}</RBLProvider>
        </Provider>
      )
    }
    const hook = renderHook(() => useRBLState(['b', 'array', 0]), { wrapper })

    act(() => hook.result.current[1](1))

    expect(hook.result.current[0]).toStrictEqual(1)
    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: { array: [1, 0, 0] }, c: 'd' } })
  })

  it('should update the whole array', () => {
    const store = createStore(
      getRBLReducer({ a: { b: { array: [0, 0, 0] }, c: 'd' } })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>
            <RBLProvider level='b'>{children}</RBLProvider>
          </RBLProvider>
        </Provider>
      )
    }
    const hook = renderHook(() => useRBLState('array'), { wrapper })
    Array.from({ length: 3 }).forEach((_, i) => {
      act(() => {
        hook.result.current[1](i, i)
      })
    })
    expect(hook.result.current[0]).toStrictEqual([0, 1, 2])

    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: { array: [0, 1, 2] }, c: 'd' } })
  })
  it('should work also with not-root reducer', () => {
    const store = createStore(
      combineReducers({ sub: getRBLReducer({ count: 1 }, 1) })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='sub'>{children}</RBLProvider>
        </Provider>
      )
    }

    const hook = renderHook(() => useRBLState('count'), {
      wrapper
    })

    expect(hook.result.current[0]).toBe(1)
    act(() => {
      hook.result.current[1](2)
    })
    expect(hook.result.current[0]).toBe(2)
    act(() => {
      hook.result.current[1]((prev: number) => prev + 1)
    })
    expect(hook.result.current[0]).toBe(3)
    const state = store.getState()
    expect(state).toStrictEqual({ sub: { count: 3 } })
  })
})
