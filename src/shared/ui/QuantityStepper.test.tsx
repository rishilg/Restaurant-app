import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuantityStepper } from './QuantityStepper'

describe('QuantityStepper', () => {
  it('shows the current quantity', () => {
    render(<QuantityStepper label="Paneer Tikka" value={2} onChange={() => {}} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('asks for one more when + is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantityStepper label="Paneer Tikka" value={2} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Add one more Paneer Tikka' }))

    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('asks for one less when - is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantityStepper label="Paneer Tikka" value={2} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Remove one Paneer Tikka' }))

    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('disables - at the minimum and + at the maximum', () => {
    const { rerender } = render(
      <QuantityStepper label="Paneer Tikka" value={1} min={1} onChange={() => {}} />,
    )
    expect(screen.getByRole('button', { name: 'Remove one Paneer Tikka' })).toBeDisabled()

    rerender(<QuantityStepper label="Paneer Tikka" value={10} max={10} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Add one more Paneer Tikka' })).toBeDisabled()
  })
})
