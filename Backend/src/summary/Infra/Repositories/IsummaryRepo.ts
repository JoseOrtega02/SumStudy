import { Summary } from 'src/summary/Domain/Entities/Summary'
import { FieldPacket, OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import { UUID } from 'crypto'
export interface IsummaryRepo<T> {
  getNextID(): UUID
  create(data: Summary): void
  getAll(): Promise<RowDataPacket[]>
  getOne(id: string): Promise<RowDataPacket>
  delete(id: string): Promise<[ResultSetHeader, FieldPacket[]]>
  update(id: string, name: string): Promise<[ResultSetHeader, FieldPacket[]]>
  getSummariesByAuthorId(id: string): Promise<RowDataPacket[]>
}
