import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'

export class RemoveLikeUseCase {
  constructor(private readonly repository: ILikesRepository<Summary>) {}
  async removeLike(userId: string, summaryId: string) {
    return this.repository.removeLike(userId, summaryId)
  }
}
