import { Summary } from 'src/summary/Domain/Entities/Summary'
import { RowDataPacket } from 'mysql2'
import { UUID } from 'crypto'
export interface IsummaryRepo<T> {
  getNextID(): Buffer
  create(data: Summary): void
  getAll(): Promise<RowDataPacket[]>
  getOne(id: string): Promise<RowDataPacket>
  delete(id: string): string
  update(id: number, name: string): Promise<RowDataPacket>
}
