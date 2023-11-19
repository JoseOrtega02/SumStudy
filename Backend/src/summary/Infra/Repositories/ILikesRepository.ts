import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

export interface ILikesRepository<T> {
  addLike(userId: string, summaryId: string): Promise<[ResultSetHeader, FieldPacket[]]>
  removeLike(userId: string, summaryId: string): Promise<[ResultSetHeader, FieldPacket[]]>
  getLikes(summaryId: string): Promise<RowDataPacket[]>
}
