import { z } from 'zod'

export const UploadSummarySchemaValidation = z.object({
  name: z.string(),
  pdf: z.string(),
  sum_desc: z.string(),
  subject: z.string(),
  career: z.string(),
  lenght: z.number(),
  up_date: z.string(),
  likes: z.number()
})
