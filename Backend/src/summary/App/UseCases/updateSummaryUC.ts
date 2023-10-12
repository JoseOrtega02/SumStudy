import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'

export class UpdateSummaryUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  updateSummary(id: number, name: string) {
    return this.repository.update(id, name)
  }
}
