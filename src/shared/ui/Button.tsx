import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand/90',
  secondary: 'border-2 border-brand bg-white text-brand hover:bg-brand-soft',
  neutral: 'bg-surface text-ink hover:bg-line',
} as const

const sizes = {
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-5 text-base',
} as const

export type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  fullWidth?: boolean
  /** Render the child element (for example a link) instead of a <button>. */
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  asChild = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      type={asChild ? undefined : type}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    />
  )
}
