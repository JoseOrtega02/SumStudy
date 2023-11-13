import { Iuser } from 'src/User/Domain/Entities/Iuser'
import { User } from 'src/User/Domain/Entities/User'
import { UserCreator } from 'src/User/Domain/Entities/UserCreator'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

interface Idata {
  name: string
  email: string
  password: string
}

export class CreateUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}

  createUser(data: Idata) {
    const id = this.repository.getNextID()
    const userData = {
      id: id,
      ...data
    }

    const newUser = UserCreator.createUser(userData)
    this.repository.create(newUser)
    return newUser
  }
}
