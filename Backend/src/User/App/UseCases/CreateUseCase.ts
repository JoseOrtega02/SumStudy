import { Iuser } from 'src/User/Domain/Entities/Iuser'
import { User } from 'src/User/Domain/Entities/User'
import { UserCreator } from 'src/User/Domain/Entities/UserCreator'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class CreateUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}

  createUser(name: string, email: string, password: string) {
    const id = this.repository.getNextID()
    const data = {
      id: id,
      name: name,
      email: email,
      password: password
    }

    const newUser = UserCreator.createUser(data)
    this.repository.create(newUser)
    return newUser
  }
}
