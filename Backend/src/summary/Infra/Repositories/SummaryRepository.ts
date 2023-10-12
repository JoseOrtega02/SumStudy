import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from './IsummaryRepo'

export default class SummaryRepository implements IsummaryRepo<Summary> {
  private summaries: Summary[]
  private idCounter: number
  constructor() {
    this.summaries = [
      { id: 1, name: 'Sumary 1' },
      { id: 2, name: 'Sumary 2' }
    ]
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
  getOne(id: number): Summary | undefined {
    return this.summaries.find((summary) => summary.id === id)
  }
  delete(id: number): number {
    const summaryIndex = this.summaries.findIndex((summary) => summary.id === id)
    this.summaries.splice(summaryIndex, 1)
    return summaryIndex
  }
  update(id: number, name: string): Summary | number {
    const sumaryIndex = this.summaries.findIndex((summary) => summary.id === id)
    if (sumaryIndex !== -1) {
      this.summaries[sumaryIndex].name = name
      return this.summaries[sumaryIndex]
    } else {
      return sumaryIndex
    }
  }
}
