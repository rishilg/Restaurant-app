import { menu } from './data/menu'
import { defaultSelection, isSelectionValid, optionNames, unitPrice } from './pricing'
function find(id: string) {
  const found = menu.items.find((i) => i.id === id)
  if (!found) throw new Error(`No sample dish ${id}`)
  return found
}

const tikka = find('paneer-tikka')
const corn = find('crispy-corn')

describe('unitPrice', () => {
  it('is the base price when no options are chosen', () => {
    expect(unitPrice(corn, [])).toBe(19900)
  })

  it('adds the price of every chosen option', () => {
    // base 27900 + full portion 12000 + chutney 2000
    expect(unitPrice(tikka, ['full', 'chutney', 'medium'])).toBe(41900)
  })

  it('ignores option ids that do not belong to the dish', () => {
    expect(unitPrice(corn, ['nonsense'])).toBe(19900)
  })
})

describe('defaultSelection', () => {
  it('preselects the first option of every required single-choice group', () => {
    expect(defaultSelection(tikka)).toEqual(['half', 'mild'])
  })

  it('is empty for a dish without options', () => {
    expect(defaultSelection(corn)).toEqual([])
  })
})

describe('isSelectionValid', () => {
  it('accepts the default selection', () => {
    expect(isSelectionValid(tikka, defaultSelection(tikka))).toBe(true)
  })

  it('rejects a missing required choice', () => {
    expect(isSelectionValid(tikka, ['half'])).toBe(false)
  })

  it('rejects too many choices in one group', () => {
    expect(isSelectionValid(tikka, ['half', 'mild', 'chutney', 'cheese-dip', 'hot'])).toBe(false)
  })

  it('accepts a dish without options', () => {
    expect(isSelectionValid(corn, [])).toBe(true)
  })
})

describe('optionNames', () => {
  it('turns option ids into readable names, in menu order', () => {
    expect(optionNames(tikka, ['mild', 'full'])).toEqual(['Full (8 pieces)', 'Mild'])
  })

  it('skips ids that do not belong to the dish', () => {
    expect(optionNames(corn, ['nonsense'])).toEqual([])
  })
})
