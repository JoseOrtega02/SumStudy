import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class DeleteUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}

  public delete(id: string) {
    return this.repository.delete(id)
  }
}
