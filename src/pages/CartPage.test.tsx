import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { useCartStore } from '@/features/cart'
import { useOrdersStore } from '@/features/orders'
import { CartPage } from './CartPage'

function renderPage() {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu" element={<p>Menu screen</p>} />
        <Route path="/orders/:orderId/placed" element={<p>Placed screen</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

function fillCart() {
  const cart = useCartStore.getState()
  cart.addLine(
    {
      itemId: 'paneer-tikka',
      name: 'Paneer Tikka',
      unitPrice: 27900,
      optionIds: ['half', 'mild'],
      note: 'no onion',
    },
    2,
  )
  cart.addLine({
    itemId: 'crispy-corn',
    name: 'Crispy Corn',
    unitPrice: 19900,
    optionIds: [],
    note: '',
  })
}

beforeEach(() => {
  useCartStore.getState().clear()
  useOrdersStore.getState().reset()
})

describe('CartPage', () => {
  it('shows an empty state with a way back to the menu', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Your cart' })).toBeInTheDocument()
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Browse menu' })).toHaveAttribute('href', '/menu')
    expect(screen.queryByRole('button', { name: /place order/i })).not.toBeInTheDocument()
  })

  it('lists each dish with its options, note and line total', () => {
    fillCart()
    renderPage()
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument()
    expect(screen.getByText('Half (4 pieces), Mild')).toBeInTheDocument()
    expect(screen.getByText('no onion')).toBeInTheDocument()
    expect(screen.getByText('₹558')).toBeInTheDocument() // 2 x 279
    expect(screen.getByText('Crispy Corn')).toBeInTheDocument()
  })

  it('shows the bill: subtotal, GST and total', () => {
    fillCart()
    renderPage()
    const bill = screen.getByRole('region', { name: 'Bill summary' })
    // 55800 + 19900 = 75700, GST 3785, total 79485
    expect(within(bill).getByText('Subtotal').nextSibling).toHaveTextContent('₹757')
    expect(within(bill).getByText('GST (5%)').nextSibling).toHaveTextContent('₹37.85')
    expect(within(bill).getByText('Total').nextSibling).toHaveTextContent('₹794.85')
    expect(screen.getByRole('button', { name: /place order/i })).toHaveTextContent('₹794.85')
  })

  it('changes quantities and removes a dish at zero', async () => {
    fillCart()
    renderPage()

    await userEvent.click(screen.getByRole('button', { name: 'Add one more Crispy Corn' }))
    expect(useCartStore.getState().lines[1]?.quantity).toBe(2)

    await userEvent.click(screen.getByRole('button', { name: 'Remove one Crispy Corn' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove one Crispy Corn' }))
    expect(screen.queryByText('Crispy Corn')).not.toBeInTheDocument()
    expect(useCartStore.getState().lines).toHaveLength(1)
  })

  it('places the order, empties the cart and opens the confirmation', async () => {
    fillCart()
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /place order/i }))

    const [order] = useOrdersStore.getState().orders
    expect(order).toMatchObject({ id: 'o-1001', subtotal: 75700, tax: 3785, total: 79485 })
    expect(order?.lines[0]).toMatchObject({
      name: 'Paneer Tikka',
      optionNames: ['Half (4 pieces)', 'Mild'],
      note: 'no onion',
      quantity: 2,
    })
    expect(useCartStore.getState().lines).toEqual([])
    expect(screen.getByText('Placed screen')).toBeInTheDocument()
  })

  it('has a link back to the menu', () => {
    fillCart()
    renderPage()
    expect(screen.getByRole('link', { name: 'Back to menu' })).toHaveAttribute('href', '/menu')
  })
})
