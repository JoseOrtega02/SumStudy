import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from './IsummaryRepo'
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
export default class SummaryRepository implements IsummaryRepo<Summary> {
  getNextID(): UUID {
    return randomUUID()
  }
  async getAll() {
    const sql =
      'SELECT BIN_TO_UUID(id) as id,name,lenght,up_date,sum_desc,pdf,career,subject,likes,author_Id FROM Summaries;'
    const [rows] = await connection.execute<RowDataPacket[]>(sql)
    return rows
  }

  async getSummariesByAuthorId(id: string) {
    const sql =
      'SELECT BIN_TO_UUID(id) as id,name,lenght,up_date,sum_desc,pdf,career,subject,likes,author_Id FROM Summaries WHERE author_Id = UUID_TO_BIN(?);'
    const values = [id]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)
    return rows
  }
  async create(sumary: Summary) {
    const sql =
      'INSERT INTO Summaries(id,name,lenght,up_date,sum_desc,pdf,career,subject,likes,author_Id) VALUES(UUID_TO_BIN(?), ?,?, ?, ?, ?, ?, ?, ?,?);'
    const values = [
      sumary.id,
      sumary.name,
      sumary.lenght,
      sumary.up_date,
      sumary.sum_desc,
      sumary.pdf,
      sumary.career,
      sumary.subject,
      sumary.likes,
      sumary.author_Id
    ]
    await connection.execute(sql, values)
  }
  async getOne(id: string) {
    const sql =
      'SELECT BIN_TO_UUID(id) as id,name,lenght,up_date,sum_desc,pdf,career,subject,likes,author_Id FROM Summaries WHERE id = UUID_TO_BIN(?);'
    const values = [id]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)

    return rows[0]
  }
  async delete(id: string) {
    const sql = 'DELETE FROM Summaries WHERE id = UUID_TO_BIN(?);'
    const values = [id]

    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute<ResultSetHeader>(sql, values)

    return result
  }
  async update(id: string, name: string) {
    const sql = 'UPDATE Summaries SET name = ? WHERE id = UUID_TO_BIN(?);'
    const values = [name, id]
    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute<ResultSetHeader>(sql, values)
    return result
  }
}
