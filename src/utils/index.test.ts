import * as utils from './'
describe('testing utils index.ts', () => {
  it('should import all', () => {
    expect(Object.keys(utils)).toHaveLength(7)
  })
})
