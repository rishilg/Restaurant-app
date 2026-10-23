import { http, HttpResponse } from 'msw'
import { z } from 'zod'
import { server } from '@/mocks/server'
import { ApiError, apiGet } from './client'

const pingSchema = z.object({ ok: z.boolean() })

describe('apiGet', () => {
  it('returns data that matches the schema', async () => {
    server.use(http.get('*/ping', () => HttpResponse.json({ ok: true })))

    await expect(apiGet('/ping', pingSchema)).resolves.toEqual({ ok: true })
  })

  it('turns an error response into an ApiError', async () => {
    server.use(
      http.get('*/ping', () =>
        HttpResponse.json(
          { code: 'KITCHEN_CLOSED', message: 'The kitchen is closed', traceId: 'abc123' },
          { status: 409 },
        ),
      ),
    )

    await expect(apiGet('/ping', pingSchema)).rejects.toMatchObject({
      name: 'ApiError',
      status: 409,
      code: 'KITCHEN_CLOSED',
      traceId: 'abc123',
    })
  })

  it('reports a network failure as NETWORK_ERROR', async () => {
    server.use(http.get('*/ping', () => HttpResponse.error()))

    const failure = await apiGet('/ping', pingSchema).catch((error: unknown) => error)

    expect(failure).toBeInstanceOf(ApiError)
    expect(failure).toMatchObject({ code: 'NETWORK_ERROR' })
  })

  it('rejects a response that does not match the schema', async () => {
    server.use(http.get('*/ping', () => HttpResponse.json({ ok: 'yes' })))

    await expect(apiGet('/ping', pingSchema)).rejects.toThrow()
  })
})
