import { useMenu } from '@/features/menu'
import { formatMoney } from '@/shared/lib'
import { VegMark } from '@/shared/ui'
import { AppProviders } from './providers'

const DEMO_RESTAURANT_ID = 'demo-restaurant'

// Temporary: proves the data layer works end to end. Replaced by real screens soon.
function MenuPreview() {
  const { data, isPending, error } = useMenu(DEMO_RESTAURANT_ID)

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 p-5">
      <h1 className="font-display text-3xl font-bold">Restaurant ordering app</h1>

      {isPending && <p className="text-muted">Loading menu…</p>}
      {error && (
        <p role="alert" className="text-danger">
          {error.message}
        </p>
      )}

      {data?.categories.map((category) => (
        <section key={category.id}>
          <h2 className="font-display text-xl font-bold">{category.name}</h2>
          <ul>
            {data.items
              .filter((item) => item.categoryId === category.id)
              .map((item) => (
                <li key={item.id} className="flex items-center gap-3 border-b border-line py-3">
                  <VegMark kind={item.isVeg ? 'veg' : 'nonveg'} />
                  <span className="flex-1">{item.name}</span>
                  <span className="font-semibold">
                    {item.available ? formatMoney(item.basePrice) : 'Sold out'}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  )
}

export function App() {
  return (
    <AppProviders>
      <MenuPreview />
    </AppProviders>
  )
}
