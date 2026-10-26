import { CircleHelp, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { filterItems, MenuItemCard, useMenu, type Diet } from '@/features/menu'
import { cn, paths } from '@/shared/lib'
import { Button, Chip, VegMark } from '@/shared/ui'
import { CartBar, QuickAdd } from '@/features/cart'

const iconLink = 'flex size-11 items-center justify-center rounded-full bg-surface hover:bg-line'

export function MenuPage() {
  const menu = useMenu()
  const [query, setQuery] = useState('')
  const [diet, setDiet] = useState<Diet>('all')
  const [categoryId, setCategoryId] = useState(menu.categories[0]?.id ?? '')

  const categories = [...menu.categories].sort((a, b) => a.sortOrder - b.sortOrder)
  const matches = filterItems(menu.items, { query, diet })
  const isSearching = query.trim() !== ''

  // One section per category that still has dishes after filtering.
  const sections = categories
    .map((category) => ({
      category,
      items: matches.filter((item) => item.categoryId === category.id),
    }))
    .filter((section) => section.items.length > 0)

  // While searching we show every match; otherwise only the chosen tab.
  const visible = isSearching ? sections : sections.filter((s) => s.category.id === categoryId)

  function toggleDiet(next: Exclude<Diet, 'all'>) {
    setDiet((current) => (current === next ? 'all' : next))
  }

  function clearFilters() {
    setQuery('')
    setDiet('all')
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex flex-col gap-3 px-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[22px] leading-tight font-bold">Your Restaurant</h1>
            <p className="text-[13px] text-subtle">Table 12 · Dine-in</p>
          </div>
          <div className="flex gap-2">
            <Link to={paths.help} aria-label="Help and call waiter" className={iconLink}>
              <CircleHelp aria-hidden className="size-[22px]" />
            </Link>
            <Link to={paths.history} aria-label="Your orders and account" className={iconLink}>
              <User aria-hidden className="size-[22px]" />
            </Link>
          </div>
        </div>

        <label className="flex h-12 items-center gap-2.5 rounded-control bg-surface px-3.5">
          <Search aria-hidden className="size-5 text-muted" />
          <input
            type="search"
            aria-label="Search dishes"
            placeholder="Search dishes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none"
          />
        </label>

        <div className="flex gap-2">
          <Chip selected={diet === 'veg'} onClick={() => toggleDiet('veg')}>
            <VegMark kind="veg" decorative />
            Veg
          </Chip>
          <Chip selected={diet === 'nonveg'} onClick={() => toggleDiet('nonveg')}>
            <VegMark kind="nonveg" decorative />
            Non-veg
          </Chip>
        </div>
      </header>

      <nav
        aria-label="Menu categories"
        className="mt-2 flex gap-1 overflow-x-auto border-b border-line px-5"
      >
        {categories.map((category) => {
          const selected = !isSearching && category.id === categoryId
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setCategoryId(category.id)
                setQuery('')
              }}
              className={cn(
                'h-12 shrink-0 border-b-[3px] px-3 text-[15px]',
                selected
                  ? 'border-brand font-bold text-ink'
                  : 'border-transparent font-medium text-muted',
              )}
            >
              {category.name}
            </button>
          )
        })}
      </nav>

      <div className="flex-1 px-5 pt-4 pb-8">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-base font-semibold">No dishes match your search</p>
            <p className="text-sm text-muted">Try a different word or clear the filters.</p>
            <Button variant="secondary" size="md" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          visible.map(({ category, items }) => (
            <section key={category.id} aria-labelledby={`cat-${category.id}`} className="mb-4">
              <h2 id={`cat-${category.id}`} className="font-display text-xl font-bold">
                {category.name}
              </h2>
              <ul>
                {items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    action={
                      <QuickAdd
                        line={{
                          itemId: item.id,
                          name: item.name,
                          unitPrice: item.basePrice,
                          optionIds: [],
                          note: '',
                        }}
                        detailHref={item.optionGroups.length > 0 ? paths.item(item.id) : undefined}
                      />
                    }
                  />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
      <CartBar />
    </main>
  )
}
