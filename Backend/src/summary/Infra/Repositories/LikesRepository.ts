import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from './ILikesRepository'
import mysql, { ConnectionOptions, FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
const access: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'summary_db',
  port: 3306
}
const connection = mysql.createPool(access)
class LikeRepository implements ILikesRepository<Summary> {
  async addLike(userId: string, summaryId: string) {
    const sql =
      'INSERT INTO Likes (like_id, summary_id, user_id) VALUES ((UUID_TO_BIN(UUID())),(SELECT id FROM Summaries WHERE id = UUID_TO_BIN(?),(SELECT id FROM users WHERE id = UUID_TO_BIN(?)));'
    const values = [summaryId, userId]
    console.log(values)
    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute(sql, values)
    return result
  }
  async removeLike(userId: string, summaryId: string) {
    const sql =
      'DELETE FROM likes WHERE summary_id = (SELECT id FROM Summaries WHERE name = ? ) AND user_id = (SELECT id FROM users WHERE name = ? );'
    const values = [summaryId, userId]
    const result: [ResultSetHeader, FieldPacket[]] = await connection.execute(sql, values)
    return result
  }
  async getLikes(summaryId: string) {
    const sql = 'SELECT likes FROM Summaries WHERE id = UUID_TO_BIN(?);'
    const values = [summaryId]
    const [rows] = await connection.execute<RowDataPacket[]>(sql, values)
    return rows
  }
}
export default LikeRepository
