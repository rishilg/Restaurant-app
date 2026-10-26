import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'served'

/** A snapshot of one dish as it was ordered. Later menu changes must not alter it. */
export type OrderLine = {
  name: string
  optionNames: string[]
  note: string
  /** One unit including options, in paise. */
  unitPrice: number
  quantity: number
}

export type Order = {
  id: string
  number: number
  lines: OrderLine[]
  subtotal: number
  tax: number
  total: number
  status: OrderStatus
  /** ISO date string. */
  placedAt: string
}

export type NewOrder = Pick<Order, 'lines' | 'subtotal' | 'tax' | 'total'>

const FIRST_ORDER_NUMBER = 1001

type OrdersState = {
  orders: Order[]
  nextNumber: number
  placeOrder: (draft: NewOrder) => Order
  reset: () => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      nextNumber: FIRST_ORDER_NUMBER,

      placeOrder: (draft) => {
        const number = get().nextNumber
        const order: Order = {
          ...draft,
          id: `o-${number}`,
          number,
          status: 'received',
          placedAt: new Date().toISOString(),
        }
        set((state) => ({ orders: [order, ...state.orders], nextNumber: number + 1 }))
        return order
      },

      reset: () => set({ orders: [], nextNumber: FIRST_ORDER_NUMBER }),
    }),
    { name: 'restaurant-orders', version: 1 },
  ),
)

/** Selector factory: `useOrdersStore(selectOrder(id))`. */
export const selectOrder = (id: string | undefined) => (state: OrdersState) =>
  state.orders.find((order) => order.id === id)
