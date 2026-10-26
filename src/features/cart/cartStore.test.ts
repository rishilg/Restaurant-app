import { selectCount, selectSubtotal, useCartStore, type NewCartLine } from './cartStore'

const tikka: NewCartLine = {
  itemId: 'paneer-tikka',
  name: 'Paneer Tikka',
  unitPrice: 27900,
  optionIds: ['half', 'medium'],
  note: '',
}

const corn: NewCartLine = {
  itemId: 'crispy-corn',
  name: 'Crispy Corn',
  unitPrice: 19900,
  optionIds: [],
  note: '',
}

beforeEach(() => {
  useCartStore.getState().clear()
})

describe('cart store', () => {
  it('starts empty', () => {
    expect(useCartStore.getState().lines).toEqual([])
    expect(selectCount(useCartStore.getState())).toBe(0)
  })

  it('adds a dish with quantity 1 by default', () => {
    useCartStore.getState().addLine(corn)
    const [line] = useCartStore.getState().lines
    expect(line).toMatchObject({ itemId: 'crispy-corn', quantity: 1 })
  })

  it('adds the requested quantity', () => {
    useCartStore.getState().addLine(corn, 3)
    expect(useCartStore.getState().lines[0]?.quantity).toBe(3)
  })

  it('merges an identical dish into the same line', () => {
    useCartStore.getState().addLine(tikka)
    useCartStore.getState().addLine(tikka, 2)
    expect(useCartStore.getState().lines).toHaveLength(1)
    expect(useCartStore.getState().lines[0]?.quantity).toBe(3)
  })

  it('keeps different options as separate lines', () => {
    useCartStore.getState().addLine(tikka)
    useCartStore.getState().addLine({ ...tikka, optionIds: ['full', 'medium'] })
    expect(useCartStore.getState().lines).toHaveLength(2)
  })

  it('treats the same options in a different order as the same line', () => {
    useCartStore.getState().addLine(tikka)
    useCartStore.getState().addLine({ ...tikka, optionIds: ['medium', 'half'] })
    expect(useCartStore.getState().lines).toHaveLength(1)
  })

  it('keeps different notes as separate lines', () => {
    useCartStore.getState().addLine(corn)
    useCartStore.getState().addLine({ ...corn, note: 'no onion' })
    expect(useCartStore.getState().lines).toHaveLength(2)
  })

  it('changes a quantity and removes the line at zero', () => {
    useCartStore.getState().addLine(corn)
    const id = useCartStore.getState().lines[0]!.id

    useCartStore.getState().setQuantity(id, 4)
    expect(useCartStore.getState().lines[0]?.quantity).toBe(4)

    useCartStore.getState().setQuantity(id, 0)
    expect(useCartStore.getState().lines).toEqual([])
  })

  it('removes a line', () => {
    useCartStore.getState().addLine(corn)
    useCartStore.getState().addLine(tikka)
    useCartStore.getState().removeLine(useCartStore.getState().lines[0]!.id)
    expect(useCartStore.getState().lines.map((l) => l.itemId)).toEqual(['paneer-tikka'])
  })

  it('counts items and adds up the subtotal in paise', () => {
    useCartStore.getState().addLine(tikka, 2)
    useCartStore.getState().addLine(corn)
    const state = useCartStore.getState()
    expect(selectCount(state)).toBe(3)
    expect(selectSubtotal(state)).toBe(27900 * 2 + 19900)
  })

  it('saves the cart to localStorage', () => {
    useCartStore.getState().addLine(corn)
    const saved = localStorage.getItem('restaurant-cart')
    expect(saved).toContain('crispy-corn')
  })
})
