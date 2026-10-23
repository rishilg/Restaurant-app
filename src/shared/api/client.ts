import { z } from 'zod'
import { env } from '@/shared/config'

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly traceId: string | undefined

  constructor(status: number, code: string, message: string, traceId?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.traceId = traceId
  }
}

/** The one error shape every backend endpoint returns. */
const errorBodySchema = z.object({
  code: z.string(),
  message: z.string(),
  traceId: z.string().optional(),
})

type RequestOptions = { signal?: AbortSignal }

/** GET a path, and check the response matches the schema before the app uses it. */
export async function apiGet<T>(
  path: string,
  schema: z.ZodType<T>,
  { signal }: RequestOptions = {},
): Promise<T> {
  const url = new URL(`${env.apiBaseUrl}${path}`, window.location.origin)

  let response: Response
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' }, signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError(0, 'NETWORK_ERROR', 'Could not reach the server. Check your connection.')
  }

  if (!response.ok) {
    const body = errorBodySchema.safeParse(await response.json().catch(() => null))
    if (body.success) {
      throw new ApiError(response.status, body.data.code, body.data.message, body.data.traceId)
    }
    throw new ApiError(response.status, 'UNKNOWN_ERROR', 'Something went wrong. Please try again.')
  }

  return schema.parse(await response.json())
}
