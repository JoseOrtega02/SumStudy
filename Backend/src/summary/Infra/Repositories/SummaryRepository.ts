import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from './IsummaryRepo'

export default class SummaryRepository implements IsummaryRepo<Summary> {
  private summaries: Summary[]
  private idCounter: number
  constructor() {
    this.summaries = []
    this.idCounter = 1
  }
  getNextID(): number {
    return this.idCounter++
  }
  getAll() {
    return this.summaries
  }
  create(sumary: Summary) {
    this.summaries.push(sumary)
  }
}
