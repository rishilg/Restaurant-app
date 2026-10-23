import { z } from 'zod'

const schema = z.object({
  VITE_API_BASE_URL: z.string().default('/api'),
  VITE_USE_MOCKS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),
})

const parsed = schema.safeParse(import.meta.env)
if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`)
}

export const env = {
  apiBaseUrl: parsed.data.VITE_API_BASE_URL,
  useMocks: parsed.data.VITE_USE_MOCKS,
}
