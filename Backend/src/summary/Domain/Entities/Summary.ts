import { Isummary } from './Isummary'

export class Summary implements Isummary {
  constructor(data: Isummary) {
    this.name = data.name
    this.id = data.id
    this.likes = data.likes
    this.pdf = data.pdf
    this.sum_desc = data.sum_desc
    this.subject = data.subject
    this.career = data.career
    this.lenght = data.lenght
    this.up_date = data.up_date
  }
  name: string
  id: Buffer
  likes: number
  pdf: string
  sum_desc: string
  subject: string
  career: string
  lenght: number
  up_date: string
}
