import { delay, http, HttpResponse } from 'msw'
import { menu } from '../data/menu'

export const menuHandlers = [
  http.get('*/restaurants/:restaurantId/menu', async () => {
    await delay(400) // feel like a real network, so loading states are visible
    return HttpResponse.json(menu)
  }),
]
