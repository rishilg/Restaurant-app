import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Chip } from './Chip'

describe('Chip', () => {
  it('is not pressed by default', () => {
    render(<Chip>Veg</Chip>)
    expect(screen.getByRole('button', { name: 'Veg' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('reports the selected state', () => {
    render(<Chip selected>Veg</Chip>)
    expect(screen.getByRole('button', { name: 'Veg' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Chip onClick={onClick}>Veg</Chip>)

    await user.click(screen.getByRole('button', { name: 'Veg' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
