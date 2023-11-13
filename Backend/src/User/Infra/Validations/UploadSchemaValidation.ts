import zod from 'zod'

export const UploadUserSchemaValidation = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string()
})
