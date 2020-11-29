import * as hooks from './'
describe('testing hooks index.ts', () => {
  it('should import all hooks', () => {
    expect(Object.keys(hooks)).toHaveLength(8)
  })
})
