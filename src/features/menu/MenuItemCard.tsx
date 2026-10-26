import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn, formatMoney, paths } from '@/shared/lib'
import { VegMark } from '@/shared/ui'
import type { MenuItem } from './schemas'

type MenuItemCardProps = {
  item: MenuItem
  /** Slot for the Add / quantity control. The menu feature does not know about the cart. */
  action?: ReactNode
}

export function MenuItemCard({ item, action }: MenuItemCardProps) {
  const details = (
    <>
      <span className="flex items-center gap-2">
        <VegMark kind={item.isVeg ? 'veg' : 'nonveg'} />
        <span className="text-base font-semibold">{item.name}</span>
      </span>
      <span className="text-[15px] font-semibold">{formatMoney(item.basePrice)}</span>
      <span className="text-sm leading-snug text-muted">{item.description}</span>
      {(item.isBestseller || item.isSpicy) && (
        <span className="flex gap-1.5">
          {item.isBestseller && (
            <span className="rounded-md bg-highlight-bg px-2 py-0.5 text-xs font-semibold text-highlight-ink">
              Bestseller
            </span>
          )}
          {item.isSpicy && (
            <span className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-semibold text-danger">
              Spicy
            </span>
          )}
        </span>
      )}
    </>
  )

  return (
    <li className="flex gap-4 border-b border-line py-4 last:border-b-0">
      {item.available ? (
        <Link to={paths.item(item.id)} className="flex min-w-0 flex-1 flex-col gap-1.5">
          {details}
        </Link>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 text-subtle">{details}</div>
      )}

      <div className="flex w-27 flex-none flex-col items-center gap-2">
        <div
          role="img"
          aria-label={`${item.name} photo placeholder`}
          className={cn(
            'flex size-27 items-center justify-center rounded-card',
            item.available ? 'bg-[#F1E4D3]' : 'bg-[#ECEAE6]',
          )}
        />
        {item.available && action}
        {!item.available && (
          <span className="flex h-11 w-full items-center justify-center rounded-xl border-[1.5px] border-line bg-surface text-sm font-bold text-muted">
            Sold out
          </span>
        )}
      </div>
    </li>
  )
}
