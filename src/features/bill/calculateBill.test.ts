import { calculateBill } from './calculateBill'

describe('calculateBill', () => {
  it('is all zeros for an empty cart', () => {
    expect(calculateBill(0)).toEqual({ subtotal: 0, tax: 0, total: 0 })
  })

  it('adds 5% GST to the subtotal', () => {
    // 974.00 rupees -> 48.70 tax -> 1022.70 total (all in paise)
    expect(calculateBill(97400)).toEqual({ subtotal: 97400, tax: 4870, total: 102270 })
  })

  it('rounds the tax to the nearest paisa', () => {
    // 5% of 1010 paise is 50.5, which rounds to 51
    expect(calculateBill(1010)).toEqual({ subtotal: 1010, tax: 51, total: 1061 })
  })

  it('always returns whole paise', () => {
    const bill = calculateBill(33333)
    expect(Number.isInteger(bill.tax)).toBe(true)
    expect(bill.total).toBe(bill.subtotal + bill.tax)
  })
})
