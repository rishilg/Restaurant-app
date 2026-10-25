import { render, screen } from '@testing-library/react'
import { VegMark } from './VegMark'

describe('VegMark', () => {
  it('is announced as vegetarian', () => {
    render(<VegMark kind="veg" />)
    expect(screen.getByRole('img', { name: 'Vegetarian' })).toBeInTheDocument()
  })

  it('is announced as non-vegetarian', () => {
    render(<VegMark kind="nonveg" />)
    expect(screen.getByRole('img', { name: 'Non-vegetarian' })).toBeInTheDocument()
  })

  it('is hidden from screen readers when decorative', () => {
    render(<VegMark kind="veg" decorative />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
