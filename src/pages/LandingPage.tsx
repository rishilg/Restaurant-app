import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { cn, paths } from '@/shared/lib'
import { Button, Input } from '@/shared/ui'

const modes = [
  { id: 'dine-in', title: 'Dine-in', hint: 'Order to your table' },
  { id: 'takeaway', title: 'Takeaway', hint: 'Pick up at a time you choose' },
] as const

type Mode = (typeof modes)[number]['id']

export function LandingPage() {
  const [mode, setMode] = useState<Mode>('dine-in')

  return (
    <main className="flex min-h-dvh flex-col gap-5 px-5 pt-6 pb-7">
      <header className="flex items-center gap-3">
        <div
          role="img"
          aria-label="Restaurant logo placeholder"
          className="flex size-11 items-center justify-center rounded-xl bg-brand font-display text-lg font-bold text-white"
        >
          YR
        </div>
        <div>
          <p className="font-display text-xl leading-tight font-bold">Your Restaurant</p>
          <p className="text-[13px] text-subtle">North Indian · Indiranagar</p>
        </div>
      </header>

      <div
        role="img"
        aria-label="Restaurant photo placeholder"
        className="flex h-50 items-center justify-center rounded-[20px] bg-[#F1E4D3] text-[13px] text-[#6B5B45]"
      >
        Restaurant photo
      </div>

      <p className="flex min-h-9 items-center gap-2 self-start rounded-full bg-surface py-2 pr-3.5 pl-3 text-sm font-semibold">
        <MapPin aria-hidden className="size-[18px]" />
        You are at Table 12
      </p>

      <h1 className="font-display text-[28px] leading-tight font-bold">
        How would you like to order?
      </h1>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Order type</legend>
        {modes.map((m) => (
          <label
            key={m.id}
            className={cn(
              'flex min-h-18 items-center gap-3.5 rounded-card px-4 py-3.5',
              mode === m.id ? 'border-2 border-brand bg-brand-soft' : 'border-[1.5px] border-line',
            )}
          >
            <input
              type="radio"
              name="mode"
              checked={mode === m.id}
              onChange={() => setMode(m.id)}
              className="size-[22px] accent-brand"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-semibold">{m.title}</span>
              <span className="text-sm text-muted">{m.hint}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <Input label="Your name (optional)" placeholder="So the kitchen knows who ordered" />

      <div className="mt-auto flex flex-col gap-3">
        <Button asChild fullWidth>
          <Link to={paths.menu}>View menu</Link>
        </Button>
        <p className="text-center text-[13px] text-subtle">
          No account needed. Sign in later to see past orders.
        </p>
      </div>
    </main>
  )
}
