import { setByLevels } from './setByLevels'
describe('testing setByLevels util', () => {
  it('shouls set simple value', () => {
    const obj = { a: 1 }
    const newObj = setByLevels(obj, ['a'], 2)
    expect(obj === newObj).toBeFalsy()
    expect(newObj).toStrictEqual({ a: 2 })
  })

  it('should set deep level value', () => {
    const obj = { a: { b: 'a' } }
    const newObj = setByLevels(obj, ['a', 'b'], 'b')
    expect(newObj).toStrictEqual({ a: { b: 'b' } })
  })
  it('should set an item in an array', () => {
    const obj = { a: { array: [0, 0, 0] } }
    const newObj = setByLevels(obj, ['a', 'array', 1], 1)
    expect(newObj).toStrictEqual({ a: { array: [0, 1, 0] } })
  })
  it('should set object', () => {
    const obj = { a: { inner: { foo: 'bar', baz: 2 } } }
    const newObj = setByLevels(obj, ['a', 'inner'], { boo: 'faz' })
    expect(newObj).toStrictEqual({ a: { inner: { boo: 'faz' } } })
  })
  it('should set array', () => {
    const obj = { a: { innerArray: [] } }
    const newObj = setByLevels(obj, ['a', 'innerArray'], [0, 1, 2, 3])
    expect(newObj).toStrictEqual({ a: { innerArray: [0, 1, 2, 3] } })
  })
  it('should keep other fields ref', () => {
    const obj = { a: { b: 'a' }, c: { foo: 1, bar: 2 } }
    const newObj: any = setByLevels(obj, ['a', 'b'], 'b')
    expect(newObj.c).toBe(obj.c)
    expect(newObj.c === obj.c).toBeTruthy()
  })
  it('should delete if given undefined', () => {
    const obj = { a: { b: 'defined' } }
    const newObj: any = setByLevels(obj, ['a', 'b'], undefined)
    expect(newObj.a.b).not.toBeDefined()
    expect(newObj).toStrictEqual({ a: {} })
  })
})
