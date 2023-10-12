import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { Summary } from '../../Domain/Entities/Summary'

export class getAllSummariesUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  getAllSumaries() {
    return this.repository.getAll()
  }
}
