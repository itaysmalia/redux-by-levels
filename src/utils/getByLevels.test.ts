import { getByLevels } from './getByLevels'

describe('testing getByLevels', () => {
  it('shouls get simple value', () => {
    const obj = { a: 1 }
    const res = getByLevels(obj, ['a'])
    expect(res).toBe(1)
  })
  it('should get an item in an array', () => {
    const obj = { a: { b: { array: [0, 1, 2, 3, 4] } } }
    const res = getByLevels(obj, ['a', 'b', 'array', 4])
    expect(res).toBe(4)
  })
  it('should get object', () => {
    const obj = { a: { b: { c: 'hello' } } }
    const res = getByLevels(obj, ['a', 'b'])
    expect(res).toStrictEqual({ c: 'hello' })
  })
  it('should get array', () => {
    const obj = { a: { b: { array: [0, 'qwerty', 2] } } }
    const res = getByLevels(obj, ['a', 'b', 'array'])
    expect(res).toStrictEqual([0, 'qwerty', 2])
  })
})
