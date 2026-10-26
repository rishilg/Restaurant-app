import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { useCartStore, type NewCartLine } from './cartStore'
import { QuickAdd } from './QuickAdd'

const corn: NewCartLine = {
  itemId: 'crispy-corn',
  name: 'Crispy Corn',
  unitPrice: 19900,
  optionIds: [],
  note: '',
}

function renderControl(detailHref?: string) {
  render(
    <MemoryRouter>
      <QuickAdd line={corn} detailHref={detailHref} />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  useCartStore.getState().clear()
})

describe('QuickAdd', () => {
  it('shows an Add button that puts the dish in the cart', async () => {
    renderControl()
    await userEvent.click(screen.getByRole('button', { name: 'Add Crispy Corn' }))

    expect(useCartStore.getState().lines[0]).toMatchObject({ itemId: 'crispy-corn', quantity: 1 })
    expect(screen.getByRole('group', { name: 'Crispy Corn quantity' })).toBeInTheDocument()
  })

  it('changes the quantity with the stepper and goes back to Add at zero', async () => {
    renderControl()
    await userEvent.click(screen.getByRole('button', { name: 'Add Crispy Corn' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add one more Crispy Corn' }))
    expect(screen.getByRole('status')).toHaveTextContent('2')

    await userEvent.click(screen.getByRole('button', { name: 'Remove one Crispy Corn' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove one Crispy Corn' }))

    expect(useCartStore.getState().lines).toEqual([])
    expect(screen.getByRole('button', { name: 'Add Crispy Corn' })).toBeInTheDocument()
  })

  it('links to the detail page when the dish has options to choose', () => {
    renderControl('/menu/crispy-corn')
    expect(screen.getByRole('link', { name: 'Add Crispy Corn' })).toHaveAttribute(
      'href',
      '/menu/crispy-corn',
    )
  })
})
