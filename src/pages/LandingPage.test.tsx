import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { LandingPage } from './LandingPage'

function renderPage() {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  )
}

describe('LandingPage', () => {
  it('asks how the guest wants to order', () => {
    renderPage()
    expect(
      screen.getByRole('heading', { name: 'How would you like to order?' }),
    ).toBeInTheDocument()
  })

  it('selects dine-in by default and lets the guest switch to takeaway', async () => {
    renderPage()
    expect(screen.getByRole('radio', { name: /dine-in/i })).toBeChecked()

    await userEvent.click(screen.getByRole('radio', { name: /takeaway/i }))

    expect(screen.getByRole('radio', { name: /takeaway/i })).toBeChecked()
    expect(screen.getByRole('radio', { name: /dine-in/i })).not.toBeChecked()
  })

  it('has an optional name field', () => {
    renderPage()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('links to the menu', () => {
    renderPage()
    expect(screen.getByRole('link', { name: 'View menu' })).toHaveAttribute('href', '/menu')
  })
})
