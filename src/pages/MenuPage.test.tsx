import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { useCartStore } from '@/features/cart'
import { MenuPage } from './MenuPage'

function renderPage() {
  render(
    <MemoryRouter>
      <MenuPage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useCartStore.getState().clear()
})
describe('MenuPage', () => {
  it('starts on the first category', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 2, name: 'Starters' })).toBeInTheDocument()
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument()
    expect(screen.queryByText('Butter Chicken')).not.toBeInTheDocument()
  })

  it('switches category from the tabs', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: 'Mains' }))
    expect(screen.getByRole('heading', { level: 2, name: 'Mains' })).toBeInTheDocument()
    expect(screen.getByText('Butter Chicken')).toBeInTheDocument()
    expect(screen.queryByText('Paneer Tikka')).not.toBeInTheDocument()
  })

  it('filters by veg and toggles it off again', async () => {
    renderPage()
    const veg = screen.getByRole('button', { name: 'Veg' })

    await userEvent.click(veg)
    expect(veg).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('Chicken 65')).not.toBeInTheDocument()

    await userEvent.click(veg)
    expect(screen.getByText('Chicken 65')).toBeInTheDocument()
  })

  it('searches across every category', async () => {
    renderPage()
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search dishes' }), 'chai')
    expect(screen.getByText('Masala Chai')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Drinks' })).toBeInTheDocument()
  })

  it('shows an empty state and can clear the filters', async () => {
    renderPage()
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search dishes' }), 'zzzz')
    expect(screen.getByText(/no dishes match/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getByText('Paneer Tikka')).toBeInTheDocument()
  })

  it('adds a simple dish straight from the menu and shows the cart bar', async () => {
    renderPage()
    expect(screen.queryByRole('link', { name: /view cart/i })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Add Crispy Corn' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add one more Crispy Corn' }))

    const bar = screen.getByRole('link', { name: /view cart/i })
    expect(bar).toHaveTextContent('2 items')
    expect(bar).toHaveTextContent('₹398')
  })

  it('sends a dish with options to its page instead of adding it', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'Add Paneer Tikka' })).toHaveAttribute(
      'href',
      '/menu/paneer-tikka',
    )
  })

  it('does not offer to add a sold-out dish', () => {
    renderPage()
    expect(screen.queryByRole('button', { name: 'Add Chicken 65' })).not.toBeInTheDocument()
  })
})
