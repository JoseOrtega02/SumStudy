import { z } from 'zod'
export const LikesSchemaValidation = z.object({
  summary_id: z.string().uuid(),
  user_id: z.string().uuid()
})
