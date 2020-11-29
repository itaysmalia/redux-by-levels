import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { getRBLReducer } from '../../'
import { useValueSetter } from './useValueSetter'
interface onlyChildrenProps {
  children: React.ReactChildren
}
describe('testing useValueSetter util hook', () => {
  it('should set a value without level behind', () => {
    const store = createStore(getRBLReducer({ a: 'Hello' }))
    const wrapper = ({ children }: onlyChildrenProps): React.ReactElement => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValueSetter(['a']), { wrapper })
    result.current('world')
    const state = store.getState()
    expect(state).toStrictEqual({ a: 'world' })
  })

  it('should set the third value', () => {
    const store = createStore(getRBLReducer({ a: { b: { c: [0, 0, 0, 0] } } }))
    const wrapper = ({ children }: onlyChildrenProps): React.ReactElement => {
      return <Provider store={store}>{children}</Provider>
    }
    const { result } = renderHook(() => useValueSetter(['a', 'b', 'c', 2]), {
      wrapper
    })
    result.current(2)
    result.current((c: number) => c + 3)
    const state = store.getState()
    expect(state).toStrictEqual({ a: { b: { c: [0, 0, 5, 0] } } })
  })
})
