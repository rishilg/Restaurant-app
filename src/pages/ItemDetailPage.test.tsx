import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { useCartStore } from '@/features/cart'
import { ItemDetailPage } from './ItemDetailPage'

function renderAt(itemId: string) {
  render(
    <MemoryRouter initialEntries={[`/menu/${itemId}`]}>
      <Routes>
        <Route path="/menu/:itemId" element={<ItemDetailPage />} />
        <Route path="/menu" element={<p>Menu screen</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useCartStore.getState().clear()
})

describe('ItemDetailPage', () => {
  it('shows the dish with its default choices and base price', () => {
    renderAt('paneer-tikka')
    expect(screen.getByRole('heading', { level: 1, name: 'Paneer Tikka' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /half/i })).toBeChecked()
    expect(screen.getByRole('radio', { name: /mild/i })).toBeChecked()
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveTextContent('₹279')
  })

  it('updates the price when options change', async () => {
    renderAt('paneer-tikka')
    await userEvent.click(screen.getByRole('radio', { name: /full/i }))
    await userEvent.click(screen.getByRole('checkbox', { name: /cheese dip/i }))
    // 27900 + 12000 + 4000 = 43900
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveTextContent('₹439')
  })

  it('multiplies the price by the quantity', async () => {
    renderAt('crispy-corn')
    await userEvent.click(screen.getByRole('button', { name: 'Add one more Crispy Corn' }))
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveTextContent('₹398')
  })

  it('adds the chosen dish to the cart and returns to the menu', async () => {
    renderAt('paneer-tikka')
    await userEvent.click(screen.getByRole('radio', { name: /full/i }))
    await userEvent.type(screen.getByLabelText('Special instructions'), 'no onion')
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(useCartStore.getState().lines[0]).toMatchObject({
      itemId: 'paneer-tikka',
      unitPrice: 39900,
      optionIds: ['full', 'mild'],
      note: 'no onion',
      quantity: 1,
    })
    expect(screen.getByText('Menu screen')).toBeInTheDocument()
  })

  it('has a back link to the menu', () => {
    renderAt('crispy-corn')
    expect(screen.getByRole('link', { name: 'Back to menu' })).toHaveAttribute('href', '/menu')
  })

  it('explains when the dish does not exist', () => {
    renderAt('no-such-dish')
    expect(screen.getByRole('heading', { name: /dish not found/i })).toBeInTheDocument()
  })

  it('explains when the dish is sold out', () => {
    renderAt('chicken-65')
    expect(screen.getByRole('heading', { name: /sold out/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument()
  })
})
