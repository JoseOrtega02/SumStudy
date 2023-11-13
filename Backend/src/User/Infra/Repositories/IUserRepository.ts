import { User } from 'src/User/Domain/Entities/User'

export interface IUserRepository<T> {
  getNextID(): number
  create(data: User): void
  getAll(): User[]
  getOne(id: string): User | undefined
  delete(id: string): number
  update(data: User): User | number
}
