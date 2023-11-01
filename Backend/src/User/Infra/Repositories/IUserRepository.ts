import { User } from 'src/User/Domain/Entities/User'

export interface IUserRepository<T> {
  getNextID(): number
  create(data: User): void
  getAll(): User[]
  getOne(id: number): User | undefined
  delete(id: number): number
  update(id: number, name: string, password: string): User | number
}
