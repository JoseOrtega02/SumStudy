import { Summary } from 'src/summary/Domain/Entities/Summary'
import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'

export class getSummaryByIdUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}
  getSummaryById(id: number) {
    return this.repository.getOne(id)
  }
}
