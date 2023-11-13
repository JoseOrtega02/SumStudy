import { z } from 'zod'

export const IDUserSchemaValidation = z.object({
  id: z.string().uuid()
})
