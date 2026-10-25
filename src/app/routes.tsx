import type { RouteObject } from 'react-router'
import {
  BillPage,
  CartPage,
  HelpPage,
  HistoryPage,
  ItemDetailPage,
  LandingPage,
  LoginPage,
  MenuPage,
  NotFoundPage,
  OrderPlacedPage,
  PaymentPage,
  ReceiptPage,
  TrackingPage,
} from '@/pages'
import { AppLayout } from './AppLayout'

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/menu/:itemId', element: <ItemDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/orders', element: <HistoryPage /> },
      { path: '/orders/:orderId', element: <TrackingPage /> },
      { path: '/orders/:orderId/placed', element: <OrderPlacedPage /> },
      { path: '/bill', element: <BillPage /> },
      { path: '/pay', element: <PaymentPage /> },
      { path: '/receipt', element: <ReceiptPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/help', element: <HelpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
