import { CircleCheck } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { selectOrder, useOrdersStore } from '@/features/orders'
import { formatMoney, paths } from '@/shared/lib'
import { Button } from '@/shared/ui'

export function OrderPlacedPage() {
  const { orderId } = useParams()
  const order = useOrdersStore(selectOrder(orderId))

  if (!order) {
    return (
      <main className="flex flex-col items-start gap-3 p-5">
        <h1 className="font-display text-2xl font-bold">Order not found</h1>
        <p className="text-muted">We could not find that order on this device.</p>
        <Button asChild>
          <Link to={paths.menu}>Back to menu</Link>
        </Button>
      </main>
    )
  }

  const itemCount = order.lines.reduce((sum, line) => sum + line.quantity, 0)

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 py-10 text-center">
      <CircleCheck aria-hidden className="size-16 text-veg" strokeWidth={1.6} />

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[28px] leading-tight font-bold">Order placed</h1>
        <p className="text-base font-semibold">Order #{order.number}</p>
        <p className="text-[15px] text-muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} · {formatMoney(order.total)}
        </p>
        <p className="text-[15px] text-muted">The kitchen has your order and will start soon.</p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button asChild fullWidth>
          <Link to={paths.tracking(order.id)}>Track your order</Link>
        </Button>
        <Button asChild fullWidth variant="neutral">
          <Link to={paths.menu}>Back to menu</Link>
        </Button>
      </div>
    </main>
  )
}
