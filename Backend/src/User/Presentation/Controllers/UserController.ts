import { CreateUseCase } from 'src/User/App/UseCases/CreateUseCase'
import { DeleteUseCase } from 'src/User/App/UseCases/DeleteUseCase'
import { GetAllUseCase } from 'src/User/App/UseCases/GetAllUseCase'
import { GetOneUseCase } from 'src/User/App/UseCases/GetOneUseCase'
import { UpdateUseCase } from 'src/User/App/UseCases/UpdateUseCase'
import { Iuser } from 'src/User/Domain/Entities/Iuser'
import { User } from 'src/User/Domain/Entities/User'
import { IUserRepository } from 'src/User/Infra/Repositories/IUserRepository'
import { IDUserSchemaValidation } from 'src/User/Infra/Validations/IDSchemaValidation'
import { UploadUserSchemaValidation } from 'src/User/Infra/Validations/UploadSchemaValidation'

export class UserController {
  public async getAllUsers(repositoryInstance: IUserRepository<User>) {
    const useCase = new GetAllUseCase(repositoryInstance)
    const Users = useCase.getAll()
    return await Users
  }

  public async getOne(id: string, repositoryInstance: IUserRepository<User>) {
    const validation = IDUserSchemaValidation.safeParse({ id })
    if (validation.success) {
      const useCase = new GetOneUseCase(repositoryInstance)
      const user = useCase.getOne(id)
      return user
    } else {
      return validation.error
    }
  }

  public async createUser(data: Iuser, repositoryInstance: IUserRepository<User>) {
    const validation = UploadUserSchemaValidation.safeParse(data)
    if (validation.success) {
      const usecase = new CreateUseCase(repositoryInstance)
      const user = usecase.createUser(data)
      return user
    } else {
      return validation.error
    }
  }

  public async deleteUser(id: string, repositoryInstance: IUserRepository<User>) {
    const validation = IDUserSchemaValidation.safeParse({ id })
    if (validation.success) {
      const usecase = new DeleteUseCase(repositoryInstance)
      const deletedUser = await usecase.delete(id)
      return { afectedRows: deletedUser[0].affectedRows }
    } else {
      return validation.error
    }
  }

  public async updateUser(data: Iuser, id: string, repositoryInstance: IUserRepository<User>) {
    const validation = UploadUserSchemaValidation.safeParse(data)
    if (validation.success) {
      const usecase = new UpdateUseCase(repositoryInstance)
      const updatedUser = await usecase.update(data, id)
      return { afectedRows: updatedUser[0].affectedRows }
    } else {
      return validation.error
    }
  }
}
