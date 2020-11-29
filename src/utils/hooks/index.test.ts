import * as utilsHooks from './'
describe('testing utils hooks index.ts', () => {
  it('should import all', () => {
    expect(Object.keys(utilsHooks)).toHaveLength(3)
  })
})
