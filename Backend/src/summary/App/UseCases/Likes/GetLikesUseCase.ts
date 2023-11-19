import { Summary } from 'src/summary/Domain/Entities/Summary'
import { ILikesRepository } from 'src/summary/Infra/Repositories/ILikesRepository'

export class GetLikesUseCase {
  constructor(private readonly repository: ILikesRepository<Summary>) {}

  async getLikes(summaryId: string) {
    return this.repository.getLikes(summaryId)
  }
}
