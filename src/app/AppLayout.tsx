import { Outlet } from 'react-router'

/** Phone-width column, centred on larger screens. Every page renders inside it. */
export function AppLayout() {
  return (
    <div className="min-h-dvh bg-surface">
      <div className="mx-auto min-h-dvh max-w-[480px] bg-white shadow-sm">
        <Outlet />
      </div>
    </div>
  )
}
