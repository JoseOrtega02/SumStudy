import { z } from 'zod'

export const IDSummarySchemaValidation = z.object({
  id: z.string().uuid()
})
