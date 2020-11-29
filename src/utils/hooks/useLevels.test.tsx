import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { RBLProvider } from '../../providers'
import { useLevels } from './useLevels'
interface onlyChildrenProps {
  children: React.ReactChildren
}
describe('testing useLevels hook', () => {
  it('should return empty if there is no context and no params', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <span>{children}</span>
    }
    const { result } = renderHook(() => useLevels(), { wrapper })
    expect(result.current).toStrictEqual([])
  })
  it('should return only level param if there is a level params (number) and no context', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <span>{children}</span>
    }
    const { result } = renderHook(() => useLevels(0), { wrapper })
    expect(result.current).toStrictEqual([0])
  })
  it('should return only level param if there is a level params (string) and no context', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <span>{children}</span>
    }
    const { result } = renderHook(() => useLevels('foo'), { wrapper })
    expect(result.current).toStrictEqual(['foo'])
  })
  it('should return only level param if there is a level params (array) and no context', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return <span>{children}</span>
    }
    const { result } = renderHook(
      () => useLevels(['root', 'array', 0, 'name']),
      { wrapper }
    )
    expect(result.current).toStrictEqual(['root', 'array', 0, 'name'])
  })
  it('should return only context if there is no level param and there is context', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <RBLProvider level='a'>
          <RBLProvider level={0}>
            <RBLProvider level={['b', 1]}>{children}</RBLProvider>
          </RBLProvider>
        </RBLProvider>
      )
    }
    const { result } = renderHook(() => useLevels([]), { wrapper })
    expect(result.current).toStrictEqual(['a', 0, 'b', 1])
  })
  it('should combine level param and context if they both exist', () => {
    const wrapper = ({ children }: onlyChildrenProps) => {
      return (
        <RBLProvider level='a'>
          <RBLProvider level={0}>
            <RBLProvider level={['b', 1]}>{children}</RBLProvider>
          </RBLProvider>
        </RBLProvider>
      )
    }
    const { result } = renderHook(
      () => useLevels(['root', 'array', 0, 'name']),
      { wrapper }
    )
    expect(result.current).toStrictEqual([
      'a',
      0,
      'b',
      1,
      'root',
      'array',
      0,
      'name'
    ])
  })
})
