import { cn } from './cn'

describe('cn', () => {
  it('joins class names and skips falsy values', () => {
    const isHidden = false
    expect(cn('a', isHidden && 'b', undefined, 'c')).toBe('a c')
  })

  it('lets the last conflicting Tailwind class win', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})
