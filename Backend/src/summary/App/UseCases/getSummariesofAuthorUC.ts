import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'

export class getSummariesofAuthorUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  getAllSumaries(id: string) {
    return this.repository.getSummariesByAuthorId(id)
  }
}
