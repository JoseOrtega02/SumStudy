import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class GetAllUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}
  getAll() {
    return this.repository.getAll()
  }
}
