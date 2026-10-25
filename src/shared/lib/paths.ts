/** Every URL in the app, in one place. Never type a route string anywhere else. */
export const paths = {
  landing: '/',
  menu: '/menu',
  item: (itemId: string) => `/menu/${itemId}`,
  cart: '/cart',
  orderPlaced: (orderId: string) => `/orders/${orderId}/placed`,
  tracking: (orderId: string) => `/orders/${orderId}`,
  history: '/orders',
  bill: '/bill',
  payment: '/pay',
  receipt: '/receipt',
  login: '/login',
  help: '/help',
} as const
