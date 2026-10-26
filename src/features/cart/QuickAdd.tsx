import { Link } from 'react-router'
import { QuantityStepper } from '@/shared/ui'
import { lineId, useCartStore, type NewCartLine } from './cartStore'

const addButton =
  'flex h-11 w-full items-center justify-center rounded-xl border-[1.5px] border-brand bg-white text-[15px] font-bold text-brand shadow-sm hover:bg-brand-soft'

type QuickAddProps = {
  /** The dish exactly as it should land in the cart. */
  line: NewCartLine
  /** Dishes with options to choose send the guest to their page instead. */
  detailHref?: string
}

export function QuickAdd({ line, detailHref }: QuickAddProps) {
  const id = lineId(line)
  const existing = useCartStore((state) => state.lines.find((l) => l.id === id))
  const addLine = useCartStore((state) => state.addLine)
  const setQuantity = useCartStore((state) => state.setQuantity)

  if (detailHref) {
    return (
      <Link to={detailHref} aria-label={`Add ${line.name}`} className={addButton}>
        Add
      </Link>
    )
  }

  if (!existing) {
    return (
      <button
        type="button"
        aria-label={`Add ${line.name}`}
        onClick={() => addLine(line)}
        className={addButton}
      >
        Add
      </button>
    )
  }

  return (
    <QuantityStepper
      label={line.name}
      value={existing.quantity}
      onChange={(value) => setQuantity(id, value)}
      className="w-full justify-between"
    />
  )
}
