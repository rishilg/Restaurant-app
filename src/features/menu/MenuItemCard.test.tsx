import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { menu } from './data/menu'
import { MenuItemCard } from './MenuItemCard'

function find(id: string) {
  const found = menu.items.find((i) => i.id === id)
  if (!found) throw new Error(`No sample dish ${id}`)
  return found
}

function renderCard(id: string) {
  render(
    <MemoryRouter>
      <MenuItemCard item={find(id)} action={<button type="button">Test action</button>} />
    </MemoryRouter>,
  )
}

describe('MenuItemCard', () => {
  it('shows name, price and description, and links to the dish', () => {
    renderCard('paneer-tikka')
    const link = screen.getByRole('link', { name: /paneer tikka/i })
    expect(link).toHaveAttribute('href', '/menu/paneer-tikka')
    expect(screen.getByText('₹279')).toBeInTheDocument()
    expect(screen.getByText(/cottage cheese/i)).toBeInTheDocument()
  })

  it('shows the Bestseller and Spicy badges', () => {
    renderCard('paneer-tikka')
    expect(screen.getByText('Bestseller')).toBeInTheDocument()
    expect(screen.getByText('Spicy')).toBeInTheDocument()
  })

  it('marks a sold-out dish and does not link to it', () => {
    renderCard('chicken-65')
    expect(screen.getByText('Sold out')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows the veg or non-veg mark', () => {
    renderCard('butter-chicken')
    expect(screen.getByRole('img', { name: 'Non-vegetarian' })).toBeInTheDocument()
  })

  it('shows the action slot for dishes that can be ordered', () => {
    renderCard('paneer-tikka')
    expect(screen.getByRole('button', { name: 'Test action' })).toBeInTheDocument()
  })

  it('hides the action slot for a sold-out dish', () => {
    renderCard('chicken-65')
    expect(screen.queryByRole('button', { name: 'Test action' })).not.toBeInTheDocument()
  })
})
