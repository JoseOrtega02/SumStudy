import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'

export class deleteSummaryUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  deleteSummary(id: string) {
    return this.repository.delete(id)
  }
}
