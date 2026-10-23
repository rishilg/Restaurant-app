import { cn } from '@/shared/lib'

type VegMarkProps = {
  kind: 'veg' | 'nonveg'
  className?: string
}

export function VegMark({ kind, className }: VegMarkProps) {
  const isVeg = kind === 'veg'

  return (
    <span
      role="img"
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
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
