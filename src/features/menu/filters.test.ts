import { menu } from './data/menu'
import { filterItems } from './filters'

const items = menu.items

describe('filterItems', () => {
  it('returns everything when nothing is filtered', () => {
    expect(filterItems(items, { query: '', diet: 'all' })).toHaveLength(items.length)
  })

  it('keeps only vegetarian dishes for the veg filter', () => {
    const result = filterItems(items, { query: '', diet: 'veg' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((i) => i.isVeg)).toBe(true)
  })

  it('keeps only non-vegetarian dishes for the non-veg filter', () => {
    const result = filterItems(items, { query: '', diet: 'nonveg' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((i) => !i.isVeg)).toBe(true)
  })

  it('matches the search text against name and description, ignoring case and spaces', () => {
    const byName = filterItems(items, { query: '  CHAI ', diet: 'all' })
    expect(byName.map((i) => i.id)).toContain('masala-chai')

    const byDescription = filterItems(items, { query: 'tandoor', diet: 'all' })
    expect(byDescription.map((i) => i.id)).toContain('paneer-tikka')
  })

  it('combines search and diet', () => {
    const result = filterItems(items, { query: 'butter', diet: 'veg' })
    expect(result.every((i) => i.isVeg)).toBe(true)
    expect(result.map((i) => i.id)).not.toContain('butter-chicken')
  })
})
