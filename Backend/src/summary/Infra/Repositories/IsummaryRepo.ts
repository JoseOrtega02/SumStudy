import { Summary } from 'src/summary/Domain/Entities/Summary'
import { RowDataPacket } from 'mysql2'
export interface IsummaryRepo<T> {
  getNextID(): Buffer
  create(data: Summary): void
  getAll(): Promise<RowDataPacket[]>
  getOne(id: number): Promise<RowDataPacket>
  delete(id: number): number
  update(id: number, name: string): Promise<RowDataPacket>
}
