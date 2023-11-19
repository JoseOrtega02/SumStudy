import { UUID } from 'crypto'
import { Isummary } from './Isummary'

export class Summary implements Isummary {
  constructor(data: Isummary) {
    this.name = data.name
    this.id = data.id

    this.pdf = data.pdf
    this.sum_desc = data.sum_desc
    this.subject = data.subject
    this.career = data.career
    this.lenght = data.lenght
    this.up_date = data.up_date
    this.author_Id = data.author_Id
  }
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
