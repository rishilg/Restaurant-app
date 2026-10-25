import { cn } from '@/shared/lib'

type VegMarkProps = {
  kind: 'veg' | 'nonveg'
  /** Hide from screen readers when a visible label already says it (like the Veg chip). */
  decorative?: boolean
  className?: string
}

export function VegMark({ kind, decorative = false, className }: VegMarkProps) {
  const isVeg = kind === 'veg'

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        'inline-flex size-4 items-center justify-center rounded-[3px] border-[1.5px]',
        isVeg ? 'border-veg' : 'border-nonveg',
        className,
      )}
    >
      <span className={cn('size-2 rounded-full', isVeg ? 'bg-veg' : 'bg-nonveg')} />
    </span>
  )
}
