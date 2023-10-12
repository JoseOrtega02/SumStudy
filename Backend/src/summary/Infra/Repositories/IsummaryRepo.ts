import { Summary } from 'src/summary/Domain/Entities/Summary'

export interface IsummaryRepo<T> {
  getNextID(): number
  create(data: Summary): void
  getAll(): Summary[]
  getOne(id: number): Summary | undefined
  delete(id: number): number
  update(id: number, name: string): Summary | number
}
