/** GST on restaurant food, in percent. One place to change it. */
export const GST_PERCENT = 5

export type Bill = {
  subtotal: number
  tax: number
  total: number
}

/** All amounts are whole paise. Tax is rounded to the nearest paisa. */
export function calculateBill(subtotal: number): Bill {
  const tax = Math.round((subtotal * GST_PERCENT) / 100)
  return { subtotal, tax, total: subtotal + tax }
}
