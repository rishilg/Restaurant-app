import { selectOrder, useOrdersStore, type NewOrder } from './ordersStore'

const draft: NewOrder = {
  lines: [
    {
      name: 'Paneer Tikka',
      optionNames: ['Half (4 pieces)'],
      note: '',
      unitPrice: 27900,
      quantity: 2,
    },
  ],
  subtotal: 55800,
  tax: 2790,
  total: 58590,
}

beforeEach(() => {
  useOrdersStore.getState().reset()
})

describe('orders store', () => {
  it('starts with no orders', () => {
    expect(useOrdersStore.getState().orders).toEqual([])
  })

  it('places an order with an id, a number and the status "received"', () => {
    const order = useOrdersStore.getState().placeOrder(draft)
    expect(order).toMatchObject({ id: 'o-1001', number: 1001, status: 'received', total: 58590 })
    expect(typeof order.placedAt).toBe('string')
    expect(useOrdersStore.getState().orders).toHaveLength(1)
  })

  it('numbers orders one after another', () => {
    useOrdersStore.getState().placeOrder(draft)
    const second = useOrdersStore.getState().placeOrder(draft)
    expect(second.id).toBe('o-1002')
  })

  it('keeps the newest order first', () => {
    useOrdersStore.getState().placeOrder(draft)
    useOrdersStore.getState().placeOrder(draft)
    expect(useOrdersStore.getState().orders.map((o) => o.id)).toEqual(['o-1002', 'o-1001'])
  })

  it('finds an order by id', () => {
    useOrdersStore.getState().placeOrder(draft)
    expect(selectOrder('o-1001')(useOrdersStore.getState())?.total).toBe(58590)
    expect(selectOrder('o-9999')(useOrdersStore.getState())).toBeUndefined()
  })

  it('saves orders to localStorage', () => {
    useOrdersStore.getState().placeOrder(draft)
    expect(localStorage.getItem('restaurant-orders')).toContain('o-1001')
  })
})
