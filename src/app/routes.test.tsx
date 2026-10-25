import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from './routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
}

describe('routes', () => {
  it.each([
    ['/', 'How would you like to order?'],
    ['/menu', 'Your Restaurant'],
    ['/menu/paneer-tikka', 'Item detail'],
    ['/cart', 'Cart'],
    ['/orders', 'Your orders'],
    ['/orders/o-1', 'Order tracking'],
    ['/orders/o-1/placed', 'Order placed'],
    ['/bill', 'Bill'],
    ['/pay', 'Payment'],
    ['/receipt', 'Receipt'],
    ['/login', 'Log in'],
    ['/help', 'Help'],
    ['/no-such-page', 'Page not found'],
  ])('shows the right page at %s', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })
})
