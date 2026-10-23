import { formatMoney } from './money'

describe('formatMoney', () => {
  it('formats whole rupees without decimals', () => {
    expect(formatMoney(27900)).toBe('₹279')
  })

  it('shows paise when there are any', () => {
    expect(formatMoney(27950)).toBe('₹279.50')
  })

  it('uses Indian digit grouping', () => {
    expect(formatMoney(12345600)).toBe('₹1,23,456')
  })

  it('formats zero and negative amounts (discounts)', () => {
    expect(formatMoney(0)).toBe('₹0')
    expect(formatMoney(-5000)).toBe('-₹50')
  })
})
