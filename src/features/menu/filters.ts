import type { MenuItem } from './schemas'

export type Diet = 'all' | 'veg' | 'nonveg'

export type MenuFilters = {
  query: string
  diet: Diet
}

/** Pure function: same input, same output. That makes it trivial to test. */
export function filterItems(items: MenuItem[], { query, diet }: MenuFilters): MenuItem[] {
  const text = query.trim().toLowerCase()

  return items.filter((item) => {
    if (diet === 'veg' && !item.isVeg) return false
    if (diet === 'nonveg' && item.isVeg) return false
    if (!text) return true
    return `${item.name} ${item.description}`.toLowerCase().includes(text)
  })
}
