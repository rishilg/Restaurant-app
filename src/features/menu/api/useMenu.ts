import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/shared/api'
import { menuSchema } from '../schemas'

export const menuKeys = {
  byRestaurant: (restaurantId: string) => ['menu', restaurantId] as const,
}

export function useMenu(restaurantId: string) {
  return useQuery({
    queryKey: menuKeys.byRestaurant(restaurantId),
    queryFn: ({ signal }) => apiGet(`/restaurants/${restaurantId}/menu`, menuSchema, { signal }),
    staleTime: 5 * 60_000, // the menu rarely changes, so reuse it for 5 minutes
  })
}
