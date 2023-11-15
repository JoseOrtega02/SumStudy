import { UUID } from 'crypto'
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import { User } from 'src/User/Domain/Entities/User'

export interface IUserRepository<T> {
  getNextID(): UUID
  create(data: User): void
  getAll(): Promise<RowDataPacket[]>
  getOne(id: string): Promise<RowDataPacket>
  delete(id: string): Promise<[ResultSetHeader, FieldPacket[]]>
  update(data: User, id: string): Promise<[ResultSetHeader, FieldPacket[]]>
}
