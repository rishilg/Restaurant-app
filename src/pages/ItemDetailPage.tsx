import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useCartStore } from '@/features/cart'
import {
  defaultSelection,
  isSelectionValid,
  unitPrice,
  useMenuItem,
  type OptionGroup,
} from '@/features/menu'
import { formatMoney, paths } from '@/shared/lib'
import { Button, QuantityStepper, VegMark } from '@/shared/ui'

function groupHint({ minSelect, maxSelect }: OptionGroup) {
  if (minSelect >= 1) {
    return maxSelect === 1 ? 'Required · pick 1' : `Required · pick ${minSelect}-${maxSelect}`
  }
  return `Optional · up to ${maxSelect}`
}

export function ItemDetailPage() {
  const { itemId } = useParams()
  const item = useMenuItem(itemId)
  const navigate = useNavigate()
  const addLine = useCartStore((state) => state.addLine)

  const [optionIds, setOptionIds] = useState<string[]>(() => (item ? defaultSelection(item) : []))
  const [note, setNote] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!item || !item.available) {
    return (
      <main className="flex flex-col items-start gap-3 p-5">
        <h1 className="font-display text-2xl font-bold">
          {item ? 'Sorry, this dish is sold out' : 'Dish not found'}
        </h1>
        <p className="text-muted">Please pick something else from the menu.</p>
        <Button asChild>
          <Link to={paths.menu}>Back to menu</Link>
        </Button>
      </main>
    )
  }

  const unit = unitPrice(item, optionIds)
  const canAdd = isSelectionValid(item, optionIds)

  function choose(group: OptionGroup, optionId: string) {
    const groupIds = group.options.map((o) => o.id)
    setOptionIds((current) => {
      if (group.maxSelect === 1) {
        return [...current.filter((id) => !groupIds.includes(id)), optionId]
      }
      return current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
    })
  }

  function handleAdd() {
    if (!item) return
    // Store the choices in menu order so the same choices always look the same.
    const ordered = item.optionGroups
      .flatMap((group) => group.options)
      .map((option) => option.id)
      .filter((id) => optionIds.includes(id))
    addLine(
      { itemId: item.id, name: item.name, unitPrice: unit, optionIds: ordered, note },
      quantity,
    )
    void navigate(paths.menu)
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <div className="relative h-60 flex-none bg-[#F1E4D3]">
        <div
          role="img"
          aria-label={`${item.name} photo placeholder`}
          className="absolute inset-0"
        />
        <Link
          to={paths.menu}
          aria-label="Back to menu"
          className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ArrowLeft aria-hidden className="size-[22px]" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 pt-5 pb-6">
        <header className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-[13px] text-muted">
            <VegMark kind={item.isVeg ? 'veg' : 'nonveg'} decorative />
            {item.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
          </p>
          <h1 className="font-display text-[26px] leading-tight font-bold">{item.name}</h1>
          <p className="text-[15px] leading-normal text-muted">{item.description}</p>
          <p className="mt-1 flex flex-wrap gap-2">
            {item.allergens.length > 0 && (
              <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
                Contains {item.allergens.join(', ').toLowerCase()}
              </span>
            )}
            {item.calories !== null && (
              <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
                {item.calories} kcal
              </span>
            )}
            {item.isSpicy && (
              <span className="rounded-md bg-brand-soft px-2.5 py-1 text-xs font-semibold text-danger">
                Spicy
              </span>
            )}
          </p>
        </header>

        {item.optionGroups.map((group) => (
          <fieldset key={group.id} className="flex flex-col">
            <legend className="mb-2 flex w-full items-baseline justify-between">
              <span className="text-base font-bold">{group.name}</span>
              <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-semibold text-muted">
                {groupHint(group)}
              </span>
            </legend>
            {group.options.map((option) => {
              const checked = optionIds.includes(option.id)
              const single = group.maxSelect === 1
              const groupCount = group.options.filter((o) => optionIds.includes(o.id)).length
              return (
                <label key={option.id} className="flex min-h-12 items-center gap-3 px-1">
                  <input
                    type={single ? 'radio' : 'checkbox'}
                    name={group.id}
                    checked={checked}
                    disabled={!single && !checked && groupCount >= group.maxSelect}
                    onChange={() => choose(group, option.id)}
                    className="size-[22px] accent-brand"
                  />
                  <span className="flex-1 text-[15px]">{option.name}</span>
                  <span className="text-[15px] text-muted">
                    {option.priceDelta === 0 ? 'Included' : `+ ${formatMoney(option.priceDelta)}`}
                  </span>
                </label>
              )
            })}
          </fieldset>
        ))}

        <label className="flex flex-col gap-2 text-base font-bold">
          Special instructions
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={200}
            placeholder="Anything the kitchen should know? Allergies, no onion, and so on."
            className="h-21 resize-none rounded-control border-[1.5px] border-line-strong px-3.5 py-3 text-[15px] font-normal"
          />
        </label>
      </div>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-line bg-white px-5 pt-3 pb-6">
        <QuantityStepper
          label={item.name}
          value={quantity}
          onChange={setQuantity}
          min={1}
          className="h-14 w-30 justify-between rounded-card border-0 bg-surface shadow-none"
        />
        <Button fullWidth disabled={!canAdd} onClick={handleAdd} className="justify-between">
          <span>Add to cart</span>
          <span>{formatMoney(unit * quantity)}</span>
        </Button>
      </div>
    </main>
  )
}
