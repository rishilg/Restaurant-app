import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { CartBar } from './CartBar'
import { useCartStore } from './cartStore'

function renderBar() {
  render(
    <MemoryRouter>
      <CartBar />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useCartStore.getState().clear()
})

describe('CartBar', () => {
  it('is hidden while the cart is empty', () => {
    renderBar()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows the item count and total and links to the cart', () => {
    useCartStore
      .getState()
      .addLine({ itemId: 'a', name: 'A', unitPrice: 19900, optionIds: [], note: '' }, 2)
    renderBar()

    const link = screen.getByRole('link', { name: /view cart/i })
    expect(link).toHaveAttribute('href', '/cart')
    expect(link).toHaveTextContent('2 items')
    expect(link).toHaveTextContent('₹398')
  })

  it('says "1 item" in the singular', () => {
    useCartStore
      .getState()
      .addLine({ itemId: 'a', name: 'A', unitPrice: 19900, optionIds: [], note: '' })
    renderBar()
    expect(screen.getByRole('link', { name: /view cart/i })).toHaveTextContent('1 item ·')
  })
})
