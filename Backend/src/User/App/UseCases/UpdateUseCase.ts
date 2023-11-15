import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class UpdateUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}
  update(data: User, id: string) {
    return this.repository.update(data, id)
  }
}
