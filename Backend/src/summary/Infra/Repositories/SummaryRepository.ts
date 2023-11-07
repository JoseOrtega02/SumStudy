import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from './IsummaryRepo'
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2/promise'
import { randomUUID } from 'crypto'

const access: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'summary_db',
  port: 3306
}
const connection = mysql.createPool(access)
export default class SummaryRepository implements IsummaryRepo<Summary> {
  getNextID(): `${string}-${string}-${string}-${string}-${string}` {
    return randomUUID()
  }
  async getAll() {
    const sql = 'SELECT * FROM Summaries;'
    const [rows] = await connection.execute<RowDataPacket[]>(sql)

    return rows
  }
  async create(sumary: Summary) {
    const sql = 'INSERT INTO Summaries(id,name,lenght,up_date,sum_desc,pdf,career,subject,likes) VALUES(?, ?);'
    const values = [
      sumary.id,
      sumary.name,
      sumary.lenght,
      sumary.up_date,
      sumary.sum_desc,
      sumary.pdf,
      sumary.career,
      sumary.subject,
      sumary.likes
    ]
    await connection.execute(sql, values)
  }
  async getOne(id: number) {
    const sql = 'SELECT * FROM Summaries WHERE id = ?;'
    const values = [id]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)
    return rows[0]
  }
  delete(id: number): number {
    const sql = 'DELETE FROM Summaries WHERE id = ?;'
    const values = [id]
    connection.execute(sql, values)
    return id
  }
  async update(id: number, name: string) {
    const sql = 'UPDATE Summaries SET name = ? WHERE id = ?;'
    const values = [name, id]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)
    return rows[0]
  }
}
