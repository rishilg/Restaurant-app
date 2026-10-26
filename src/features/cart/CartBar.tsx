import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { formatMoney, paths } from '@/shared/lib'
import { selectCount, selectSubtotal, useCartStore } from './cartStore'

/** Sticky bar at the bottom of the menu. Appears once something is in the cart. */
export function CartBar() {
  const count = useCartStore(selectCount)
  const subtotal = useCartStore(selectSubtotal)

  if (count === 0) return null

  return (
    <div className="sticky bottom-0 border-t border-line bg-white px-5 pt-3 pb-6">
      <Link
        to={paths.cart}
        className="flex h-14 items-center justify-between rounded-card bg-brand px-5 text-base font-semibold text-white hover:bg-brand/90"
      >
        <span>
          {count} {count === 1 ? 'item' : 'items'} · {formatMoney(subtotal)}
        </span>
        <span className="flex items-center gap-2">
          View cart
          <ArrowRight aria-hidden className="size-5" />
        </span>
      </Link>
    </div>
  )
}
