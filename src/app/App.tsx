import { Button } from '@/shared/ui'

export function App() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-3 p-5">
      <h1 className="font-display text-3xl font-bold">Restaurant ordering app</h1>
      <p className="text-muted">Project setup is working.</p>
      <Button>View menu</Button>
      <Button variant="secondary">Add</Button>
      <Button variant="neutral" size="md">
        Cancel
      </Button>
      <Button disabled>Place order</Button>
    </main>
  )
}
