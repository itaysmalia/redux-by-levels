import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { RBLProvider } from '../providers'
import { useRBLSetter } from './useRBLSetter'
import { getRBLReducer } from '../get-reducer'

interface onlyChildrenProps {
  children: React.ReactChildren
}

describe('testing useRBLSetter hook', () => {
  it('should set simple value', () => {
    const store = createStore(getRBLReducer({ a: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>{children}</RBLProvider>
        </Provider>
      )
    }
    const hook = renderHook(() => useRBLSetter(), { wrapper })
    hook.result.current(2)
    const state = store.getState()
    expect(state).toStrictEqual({ a: 2 })
  })

  it('should set value with two levels', () => {
    const store = createStore(getRBLReducer({ foo: { bar: 'baz' } }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='foo'>{children}</RBLProvider>
        </Provider>
      )
    }

    const hook = renderHook(() => useRBLSetter('bar'), { wrapper })
    hook.result.current('rbl')
    const state = store.getState()
    expect(state).toStrictEqual({ foo: { bar: 'rbl' } })
  })

  it('should increment count twice', () => {
    const store = createStore(getRBLReducer({ count: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const hook = renderHook(() => useRBLSetter('count'), { wrapper })
    hook.result.current((prev: number) => prev + 1)
    hook.result.current((prev: number) => prev + 1)
    const state = store.getState()
    expect(state).toStrictEqual({ count: 3 })
  })

  it('should update the array', () => {
    const store = createStore(
      getRBLReducer({ a: { b: { array: [0, 0, 0, 0, 0] } } })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level={'a'}>{children}</RBLProvider>
        </Provider>
      )
    }
    const hook = renderHook(() => useRBLSetter(['b', 'array']), {
      wrapper
    })
    Array.from({ length: 5 }).forEach((_, i) => {
      hook.result.current(i, i)
    })
    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: { array: [0, 1, 2, 3, 4] } } })
  })

  it('should update the array with different hooks', () => {
    const store = createStore(
      getRBLReducer({ a: { b: { array: [0, 0, 0, 0, 0] } } })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level={'a'}>{children}</RBLProvider>
        </Provider>
      )
    }

    Array.from({ length: 5 }).forEach((_, i) => {
      const hook = renderHook(() => useRBLSetter(['b', 'array', i]), {
        wrapper
      })
      hook.result.current(i)
    })
    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: { array: [0, 1, 2, 3, 4] } } })
  })
})
