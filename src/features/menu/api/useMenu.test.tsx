import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { ApiError } from '@/shared/api'
import { createQueryWrapper } from '@/test/queryWrapper'
import { useMenu } from './useMenu'

describe('useMenu', () => {
  it('loads the menu', async () => {
    const { result } = renderHook(() => useMenu('demo-restaurant'), {
      wrapper: createQueryWrapper(),
    })

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.categories[0]?.name).toBe('Starters')
    expect(result.current.data?.items.length).toBeGreaterThan(0)
  })

  it('exposes an ApiError when the server fails', async () => {
    server.use(
      http.get('*/restaurants/:restaurantId/menu', () =>
        HttpResponse.json(
          { code: 'MENU_UNAVAILABLE', message: 'Menu is unavailable', traceId: 't-1' },
          { status: 503 },
        ),
      ),
    )

    const { result } = renderHook(() => useMenu('demo-restaurant'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeInstanceOf(ApiError)
    expect(result.current.error).toMatchObject({ code: 'MENU_UNAVAILABLE', status: 503 })
  })
})
