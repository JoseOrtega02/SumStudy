import { z } from 'zod'

export const UpdateSummarySchemaValidation = z.object({
  id: z.string().uuid(),
  name: z.string()
})
