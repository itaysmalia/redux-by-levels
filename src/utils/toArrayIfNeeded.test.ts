import { toArrayIfNeeded } from './toArrayIfNeeded'

describe('testing toArrayIfNeeded util', () => {
  it('should return the same', () => {
    expect(toArrayIfNeeded([0])).toStrictEqual([0])
  })

  it('should return the same 2', () => {
    expect(toArrayIfNeeded(['hello', 'world'])).toStrictEqual([
      'hello',
      'world'
    ])
  })

  it('should return in array', () => {
    expect(toArrayIfNeeded('foo')).toStrictEqual(['foo'])
  })

  it('should return in array 2', () => {
    expect(toArrayIfNeeded(0)).toStrictEqual([0])
  })

  it('should return empty array', () => {
    expect(toArrayIfNeeded()).toStrictEqual([])
  })
})
