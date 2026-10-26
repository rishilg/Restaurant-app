import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartLine = {
  /** Identifies "this dish with these exact options and note". */
  id: string
  itemId: string
  name: string
  /** Price of ONE unit including chosen options, in paise. */
  unitPrice: number
  optionIds: string[]
  note: string
  quantity: number
}

export type NewCartLine = Omit<CartLine, 'id' | 'quantity'>

type CartState = {
  lines: CartLine[]
  addLine: (line: NewCartLine, quantity?: number) => void
  setQuantity: (lineId: string, quantity: number) => void
  removeLine: (lineId: string) => void
  clear: () => void
}

/** Same dish + same options (any order) + same note = the same line. */
export function lineId({ itemId, optionIds, note }: NewCartLine) {
  return [itemId, [...optionIds].sort().join(','), note.trim()].join('|')
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],

      addLine: (line, quantity = 1) =>
        set((state) => {
          const id = lineId(line)
          const existing = state.lines.find((l) => l.id === id)
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            }
          }
          return { lines: [...state.lines, { ...line, id, note: line.note.trim(), quantity }] }
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.id !== id)
              : state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        })),

      removeLine: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),

      clear: () => set({ lines: [] }),
    }),
    { name: 'restaurant-cart', version: 1 },
  ),
)

/** Selectors: small functions that read one answer out of the store. */
export const selectCount = (state: CartState) =>
  state.lines.reduce((total, l) => total + l.quantity, 0)

export const selectSubtotal = (state: CartState) =>
  state.lines.reduce((total, l) => total + l.unitPrice * l.quantity, 0)
