import { Summary } from 'src/summary/Domain/Entities/Summary'

export interface IsummaryRepo<T> {
  getNextID(): number
  create(data: Summary): void
  getAll(): Summary[]
}
