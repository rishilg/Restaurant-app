import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

type ChipProps = ComponentProps<'button'> & {
  selected?: boolean
}

export function Chip({
  selected = false,
  type = 'button',
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] px-3.5 text-sm font-semibold text-ink transition-colors',
        selected ? 'border-brand bg-brand-soft' : 'border-line-strong bg-white hover:bg-surface',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
