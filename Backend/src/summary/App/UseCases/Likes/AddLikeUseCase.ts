import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'

export class AddLikeUseCase {
  constructor(private readonly repository: ILikesRepository<Summary>) {}
  public addLike(userId: string, summaryId: string) {
    return this.repository.addLike(userId, summaryId)
  }
}
