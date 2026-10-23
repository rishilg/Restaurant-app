import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('connects the label to the field', () => {
    render(<Input label="Your name" />)
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
  })

  it('lets the user type', async () => {
    const user = userEvent.setup()
    render(<Input label="Your name" />)
    const field = screen.getByLabelText('Your name')

    await user.type(field, 'Rishil')

    expect(field).toHaveValue('Rishil')
  })

  it('describes the field with a hint', () => {
    render(<Input label="Your name" hint="So the kitchen knows who ordered" />)
    expect(screen.getByLabelText('Your name')).toHaveAccessibleDescription(
      'So the kitchen knows who ordered',
    )
  })

  it('shows an error, marks the field invalid and announces it', () => {
    render(<Input label="Phone number" error="Enter a 10-digit number" />)
    const field = screen.getByLabelText('Phone number')

    expect(field).toBeInvalid()
    expect(field).toHaveAccessibleDescription('Enter a 10-digit number')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a 10-digit number')
  })
})
