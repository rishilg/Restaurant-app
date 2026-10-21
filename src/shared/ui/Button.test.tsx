import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label and defaults to type="button"', () => {
    render(<Button>Add to cart</Button>)
    const button = screen.getByRole('button', { name: 'Add to cart' })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Pay</Button>)

    await user.click(screen.getByRole('button', { name: 'Pay' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Place order
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Place order' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies the secondary variant styles', () => {
    render(<Button variant="secondary">Add</Button>)
    expect(screen.getByRole('button', { name: 'Add' })).toHaveClass('border-brand')
  })

  it('can render as a link with button styles (asChild)', () => {
    render(
      <Button asChild>
        <a href="/menu">View menu</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'View menu' })
    expect(link).toHaveAttribute('href', '/menu')
    expect(link).toHaveClass('bg-brand')
  })
})
