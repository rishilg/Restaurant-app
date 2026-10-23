import { Minus, Plus } from 'lucide-react'
import { cn } from '@/shared/lib'

type QuantityStepperProps = {
  /** What is being counted, for screen readers (for example the dish name). */
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

const buttonStyles =
  'flex size-11 items-center justify-center text-brand disabled:cursor-not-allowed disabled:opacity-40'

export function QuantityStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={`${label} quantity`}
      className={cn(
        'inline-flex h-11 items-center rounded-xl border-[1.5px] border-brand bg-white shadow-sm',
        className,
      )}
    >
      <button
        type="button"
        aria-label={`Remove one ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={buttonStyles}
      >
        <Minus size={18} strokeWidth={2.4} />
      </button>
      <output className="min-w-8 text-center text-base font-bold text-ink">{value}</output>
      <button
        type="button"
        aria-label={`Add one more ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonStyles}
      >
        <Plus size={18} strokeWidth={2.4} />
      </button>
    </div>
  )
}
