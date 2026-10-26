import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { useOrdersStore } from '@/features/orders'
import { OrderPlacedPage } from './OrderPlacedPage'

function renderAt(orderId: string) {
  render(
    <MemoryRouter initialEntries={[`/orders/${orderId}/placed`]}>
      <Routes>
        <Route path="/orders/:orderId/placed" element={<OrderPlacedPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useOrdersStore.getState().reset()
})

describe('OrderPlacedPage', () => {
  it('confirms the order with its number, item count and total', () => {
    useOrdersStore.getState().placeOrder({
      lines: [
        { name: 'Paneer Tikka', optionNames: [], note: '', unitPrice: 27900, quantity: 2 },
        { name: 'Crispy Corn', optionNames: [], note: '', unitPrice: 19900, quantity: 1 },
      ],
      subtotal: 75700,
      tax: 3785,
      total: 79485,
    })
    renderAt('o-1001')

    expect(screen.getByRole('heading', { name: 'Order placed' })).toBeInTheDocument()
    expect(screen.getByText('Order #1001')).toBeInTheDocument()
    expect(screen.getByText(/3 items/)).toBeInTheDocument()
    expect(screen.getByText(/₹794.85/)).toBeInTheDocument()
  })

  it('links to tracking and back to the menu', () => {
    useOrdersStore.getState().placeOrder({ lines: [], subtotal: 0, tax: 0, total: 0 })
    renderAt('o-1001')

    expect(screen.getByRole('link', { name: 'Track your order' })).toHaveAttribute(
      'href',
      '/orders/o-1001',
    )
    expect(screen.getByRole('link', { name: 'Back to menu' })).toHaveAttribute('href', '/menu')
  })

  it('explains when the order does not exist', () => {
    renderAt('o-404')
    expect(screen.getByRole('heading', { name: 'Order not found' })).toBeInTheDocument()
  })
})
