import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { Summary } from '../Entities/Summary'
import { SummaryCreator } from '../Entities/SummaryCreator'

class createSummaryUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}

  public cresateSummary(name: string) {
    const data = {
      id: this.repository.getNextID(),
      name: name
    }
    const newSum = SummaryCreator.createSummary(data)
    this.repository.create(newSum)
    return newSum
  }
}
export default createSummaryUC
