import { CreateUseCase } from 'src/User/App/UseCases/CreateUseCase'
import { DeleteUseCase } from 'src/User/App/UseCases/DeleteUseCase'
import { GetAllUseCase } from 'src/User/App/UseCases/GetAllUseCase'
import { GetOneUseCase } from 'src/User/App/UseCases/GetOneUseCase'
import { UpdateUseCase } from 'src/User/App/UseCases/UpdateUseCase'
import { Iuser } from 'src/User/Domain/Entities/Iuser'
import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'

export class UserController {
  public async getAllUsers(repositoryInstance: IUserRepository<User>) {
    const useCase = new GetAllUseCase(repositoryInstance)
    const Users = useCase.getAll()
    return Users
  }

  public async getOne(id: string, repositoryInstance: IUserRepository<User>) {
    const useCase = new GetOneUseCase(repositoryInstance)
    const user = useCase.getOne(id)
    return user
  }

  public async createUser(data: Iuser, repositoryInstance: IUserRepository<User>) {
    const usecase = new CreateUseCase(repositoryInstance)
    const user = usecase.createUser(data)
    return user
  }

  public async deleteUser(id: string, repositoryInstance: IUserRepository<User>) {
    const usecase = new DeleteUseCase(repositoryInstance)
    const deletedUser = usecase.delete(id)
    return deletedUser
  }

  public async updateUser(data: Iuser, repositoryInstance: IUserRepository<User>) {
    const usecase = new UpdateUseCase(repositoryInstance)
    const updatedUser = usecase.update(data)
    return updatedUser
  }
}
