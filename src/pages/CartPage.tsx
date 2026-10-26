import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { calculateBill, GST_PERCENT } from '@/features/bill'
import { selectSubtotal, useCartStore } from '@/features/cart'
import { optionNames, useMenu } from '@/features/menu'
import { useOrdersStore } from '@/features/orders'
import { formatMoney, paths } from '@/shared/lib'
import { Button, QuantityStepper } from '@/shared/ui'

export function CartPage() {
  const menu = useMenu()
  const navigate = useNavigate()
  const lines = useCartStore((state) => state.lines)
  const subtotal = useCartStore(selectSubtotal)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const clearCart = useCartStore((state) => state.clear)
  const placeOrder = useOrdersStore((state) => state.placeOrder)

  const bill = calculateBill(subtotal)

  function describe(itemId: string, optionIds: string[]) {
    const item = menu.items.find((i) => i.id === itemId)
    return item ? optionNames(item, optionIds) : []
  }

  function handlePlaceOrder() {
    const order = placeOrder({
      lines: lines.map((line) => ({
        name: line.name,
        optionNames: describe(line.itemId, line.optionIds),
        note: line.note,
        unitPrice: line.unitPrice,
        quantity: line.quantity,
      })),
      ...bill,
    })
    clearCart()
    void navigate(paths.orderPlaced(order.id))
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex items-center gap-3 px-5 pt-4 pb-2">
        <Link
          to={paths.menu}
          aria-label="Back to menu"
          className="flex size-11 items-center justify-center rounded-full bg-surface hover:bg-line"
        >
          <ArrowLeft aria-hidden className="size-[22px]" />
        </Link>
        <h1 className="font-display text-[22px] font-bold">Your cart</h1>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
          <p className="text-base font-semibold">Your cart is empty</p>
          <p className="text-sm text-muted">Add a few dishes and they will show up here.</p>
          <Button asChild>
            <Link to={paths.menu}>Browse menu</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-6 px-5 pt-2 pb-6">
            <ul>
              {lines.map((line) => {
                const options = describe(line.itemId, line.optionIds)
                return (
                  <li key={line.id} className="flex gap-3 border-b border-line py-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-base font-semibold">{line.name}</span>
                      {options.length > 0 && (
                        <span className="text-sm text-muted">{options.join(', ')}</span>
                      )}
                      {line.note && <span className="text-sm text-muted italic">{line.note}</span>}
                    </div>
                    <div className="flex flex-none flex-col items-end gap-2">
                      <span className="text-[15px] font-semibold">
                        {formatMoney(line.unitPrice * line.quantity)}
                      </span>
                      <QuantityStepper
                        label={line.name}
                        value={line.quantity}
                        onChange={(value) => setQuantity(line.id, value)}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>

            <Link to={paths.menu} className="text-[15px] font-semibold text-brand">
              + Add more dishes
            </Link>

            <section
              aria-label="Bill summary"
              className="flex flex-col gap-2 rounded-card bg-surface p-4"
            >
              <div className="flex justify-between text-[15px]">
                <span>Subtotal</span>
                <span>{formatMoney(bill.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span>GST ({GST_PERCENT}%)</span>
                <span>{formatMoney(bill.tax)}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
                <span>Total</span>
                <span>{formatMoney(bill.total)}</span>
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 border-t border-line bg-white px-5 pt-3 pb-6">
            <Button fullWidth onClick={handlePlaceOrder} className="justify-between">
              <span>Place order</span>
              <span>{formatMoney(bill.total)}</span>
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
