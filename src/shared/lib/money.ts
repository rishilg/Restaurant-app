/**
 * Money is always stored and sent as whole paise (an integer): 27900 paise = ₹279.
 * Convert to a display string only here, at the very edge of the UI.
 */
export function formatMoney(paise: number): string {
  const hasPaise = paise % 100 !== 0

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(paise / 100)
}
