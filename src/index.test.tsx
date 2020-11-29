import * as RBL from '.'
describe('testing index.js', () => {
  it('should import * as RBL from index.ts', () => {
    expect(RBL).toBeDefined()
  })
  it('should import all functions from index.js', () => {
    expect(Object.keys(RBL)).toHaveLength(18)
  })
})
