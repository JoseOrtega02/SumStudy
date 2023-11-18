import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { Summary } from '../../Domain/Entities/Summary'

export class getAllSummariesUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  getAllSumaries(limit: string) {
    return this.repository.getAll(limit)
  }
}
