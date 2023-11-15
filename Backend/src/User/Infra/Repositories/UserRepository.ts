import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from './IUserRepository'
import { UserCreator } from 'src/User/Domain/Entities/UserCreator'
import mysql, { ConnectionOptions, FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { UUID, randomUUID } from 'crypto'

const access: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'summary_db',
  port: 3306
}
const connection = mysql.createPool(access)
export class UserRepository implements IUserRepository<User> {
  getNextID(): UUID {
    return randomUUID()
  }
  create(data: User): void {
    const sql = 'INSERT INTO Users (id, name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?);'
    const values = [data.id, data.name, data.email, data.password]
    connection.execute(sql, values)
  }
  async getAll() {
    const sql = 'SELECT BIN_TO_UUID(id) as id, name, email, password FROM Users;'
    const [rows] = await connection.execute<RowDataPacket[]>(sql)
    return rows
  }
  async getOne(id: string) {
    const sql = 'SELECT BIN_TO_UUID(id) as id, name, email, password FROM Users WHERE id = UUID_TO_BIN(?);'
    const values = [id]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)
    return rows[0]
  }
  async delete(id: string) {
    const sql = 'DELETE FROM Users WHERE id = UUID_TO_BIN(?);'
    const values = [id]
    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute<ResultSetHeader>(sql, values)
    return result
  }
  async update(data: User, id: string) {
    const sql = 'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = UUID_TO_BIN(?);'
    const values = [data.name, data.email, data.password, id]
    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute<ResultSetHeader>(sql, values)
    return result
  }
}
