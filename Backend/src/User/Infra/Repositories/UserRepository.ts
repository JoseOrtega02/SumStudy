import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from './IUserRepository'
import { UserCreator } from 'src/User/Domain/Entities/UserCreator'

export class UserRepository implements IUserRepository<User> {
  private Users: User[]
  private idCounter: number
  constructor() {
    this.idCounter = 0
    this.Users = [
      {
        id: this.idCounter++,
        name: 'jose',
        email: 'jose',
        password: 'jose'
      },
      {
        id: this.idCounter++,
        name: 'jose2',
        email: 'jose2',
        password: 'jose2'
      }
    ]
  }
  getNextID(): number {
    return this.idCounter++
  }
  create(data: User): void {
    this.Users.push(data)
  }
  getAll(): User[] {
    return this.Users
  }
  getOne(id: string): User | undefined {
    const UserIndex = this.Users.findIndex((user) => user.id === parseInt(id))
    return this.Users[UserIndex]
  }
  delete(id: string): number {
    const UserIndex = this.Users.findIndex((user) => user.id === parseInt(id))
    this.Users.splice(UserIndex, 1)
    return UserIndex
  }
  update(data: User): number | User {
    const { id, name, password } = data
    const UserIndex = this.Users.findIndex((user) => user.id === id)
    if (UserIndex !== -1) {
      this.Users[UserIndex].name = name
      this.Users[UserIndex].password = password
      return this.Users[UserIndex]
    } else {
      return UserIndex
    }
  }
}
