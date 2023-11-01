import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class UpdateUseCase {
  constructor(private readonly repository: IUserRepository<User>) {}
  update(id: number, name: string, password: string) {
    return this.repository.update(id, name, password)
  }
}
