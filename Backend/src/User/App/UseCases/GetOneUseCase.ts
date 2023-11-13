import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class GetOneUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}

  public getOne(id: string): User | undefined {
    return this.repository.getOne(id)
  }
}
