import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'

export class searchSummariesUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  getAllSumaries(name: string) {
    return this.repository.searchSummaries(name)
  }
}
