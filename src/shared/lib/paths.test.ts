import { paths } from './paths'

describe('paths', () => {
  it('builds URLs that include ids', () => {
    expect(paths.item('paneer-tikka')).toBe('/menu/paneer-tikka')
    expect(paths.tracking('o-1')).toBe('/orders/o-1')
    expect(paths.orderPlaced('o-1')).toBe('/orders/o-1/placed')
  })
})
