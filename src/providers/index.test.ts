import * as providers from './'
describe('testing providers index.ts', () => {
  it('should import all providers', () => {
    expect(Object.keys(providers)).toHaveLength(2)
  })
})
