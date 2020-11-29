import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { getRBLReducer } from '../utils'
import { RBLProvider } from '../providers'
import { useRBLRootValue } from './useRBLRootValue'

interface onlyChildrenProps {
  children: React.ReactChildren
}

describe('testing useRBLRootValue hook', () => {
  it('should get value', () => {
    const store = createStore(getRBLReducer({ a: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='foobarbaz'>{children}</RBLProvider>
        </Provider>
      )
    }
    const value = renderHook(() => useRBLRootValue('a'), { wrapper })
    expect(value.result.current).toBe(1)
  })

  it('should get the value from also from inside params', () => {
    const store = createStore(getRBLReducer({ a: { b: 'c' } }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level={1}>
            <RBLProvider level='abc'>
              <RBLProvider level={[1, 'Hello', 'World']}>
                {children}
              </RBLProvider>
            </RBLProvider>
          </RBLProvider>
        </Provider>
      )
    }
    const value = renderHook(() => useRBLRootValue(['a', 'b']), {
      wrapper
    })
    expect(value.result.current).toBe('c')
  })

  it('should get an object', () => {
    const store = createStore(getRBLReducer({ a: { b: { d: { e: 5 } } } }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='a'>{children}</RBLProvider>
        </Provider>
      )
    }
    const value = renderHook(() => useRBLRootValue(['a', 'b']), { wrapper })
    expect(value.result.current).toStrictEqual({ d: { e: 5 } })
  })

  it('should get item from array', () => {
    const store = createStore(getRBLReducer({ a: [0, 10, 20, 30, 40] }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='this is a level'>{children}</RBLProvider>
        </Provider>
      )
    }
    const value = renderHook(() => useRBLRootValue(['a', 4]), { wrapper })
    expect(value.result.current).toBe(40)
  })

  it('should get object from array', () => {
    const store = createStore(
      getRBLReducer({ a: { b: [{}, { t: { foo: 'bar' } }] } })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <Provider store={store}>
          <RBLProvider level='mis'>
            <RBLProvider level='take'>
              <RBLProvider level={0}></RBLProvider>
              <RBLProvider level={2}>{children}</RBLProvider>
            </RBLProvider>
          </RBLProvider>
        </Provider>
      )
    }
    const value = renderHook(() => useRBLRootValue(['a', 'b', 1, 't']), {
      wrapper
    })
    expect(value.result.current).toStrictEqual({ foo: 'bar' })
  })
})
