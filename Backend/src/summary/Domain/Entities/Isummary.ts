import { UUID } from 'crypto'

export interface Isummary {
  name: string
  id: UUID

  pdf: string
  sum_desc: string
  subject: string
  career: string
  lenght: number
  up_date: string
  author_Id: string
}
