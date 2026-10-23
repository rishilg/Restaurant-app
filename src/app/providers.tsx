import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

export function AppProviders({ children }: { children: ReactNode }) {
  // useState keeps one QueryClient (and its cache) for the whole life of the app.
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 60_000 } } }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
