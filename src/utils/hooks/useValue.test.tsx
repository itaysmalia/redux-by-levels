import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { getRBLReducer } from '../../get-reducer'
import { useValue } from './useValue'

interface onlyChildrenProps {
  children: React.ReactChildren
}
describe('testing useValue hook', () => {
  it('shouls return simple value', () => {
    const store = createStore(getRBLReducer({ a: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValue(), { wrapper })
    expect(result.current).toStrictEqual({ a: 1 })
  })
  it('should return an item with level given', () => {
    const store = createStore(getRBLReducer({ a: 1 }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValue(['a']), { wrapper })
    expect(result.current).toBe(1)
  })
  it('should return an item in an array', () => {
    const store = createStore(getRBLReducer({ a: { array: [0, 1, 2, 3, 4] } }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValue(['a', 'array', 2]), {
      wrapper
    })
    expect(result.current).toBe(2)
  })
  it('should return object', () => {
    const store = createStore(
      getRBLReducer({
        a: { obj: { foo: 1, bar: [1, 2, 3], baz: 'Hello World' } }
      })
    )
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValue(['a', 'obj']), {
      wrapper
    })
    expect(result.current).toStrictEqual({
      foo: 1,
      bar: [1, 2, 3],
      baz: 'Hello World'
    })
  })
  it('should return array', () => {
    const store = createStore(getRBLReducer({ a: { array: [0, 1, 2, 3, 4] } }))
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValue(['a', 'array']), {
      wrapper
    })
    expect(result.current).toStrictEqual([0, 1, 2, 3, 4])
  })
})
