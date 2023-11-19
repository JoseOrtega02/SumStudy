import { AddLikeUseCase } from 'src/summary/App/UseCases/Likes/AddLikeUseCase'
import { GetLikesUseCase } from 'src/summary/App/UseCases/Likes/GetLikesUseCase'
import { RemoveLikeUseCase } from 'src/summary/App/UseCases/Likes/RemoveLikeUseCase'
import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'
import { IDSummarySchemaValidation } from 'src/summary/Infra/Validations/IDSchemaValidation'
import { LikesSchemaValidation } from 'src/summary/Infra/Validations/LikesSchemaValidation'

export class LikeController {
  constructor() {}

  public async addLike(repositoryInstance: ILikesRepository<Summary>, data: Object) {
    const validation = LikesSchemaValidation.safeParse(data)
    console.log(validation)
    if (!validation.success) {
      return validation.error
    }
    const useCase = new AddLikeUseCase(repositoryInstance)
    const user = useCase.addLike(validation.data.user_id, validation.data.summary_id)
    return user
  }

  public async removeLike(repositoryInstance: ILikesRepository<Summary>, userId: string, summaryId: string) {
    const validation = LikesSchemaValidation.safeParse({ userId, summaryId })

    if (!validation.success) {
      return validation.error
    }
    const useCase = new RemoveLikeUseCase(repositoryInstance)
    const user = useCase.removeLike(userId, summaryId)
    return user
  }

  public async getLikes(repositoryInstance: ILikesRepository<Summary>, summaryId: string) {
    const validation = IDSummarySchemaValidation.safeParse({ summaryId })
    console.log(validation)
    if (!validation.success) {
      console.log(validation)
      return validation.error
    }
    const useCase = new GetLikesUseCase(repositoryInstance)
    const user = useCase.getLikes(validation.data.id)
    return user
  }
}
