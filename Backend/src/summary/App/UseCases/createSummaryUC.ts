import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { Summary } from '../../Domain/Entities/Summary'
import { SummaryCreator } from '../../Domain/Entities/SummaryCreator'

interface data {
  name: string
  pdf: string
  sum_desc: string
  subject: string
  career: string
  lenght: number
  up_date: string
  likes: number
}

class createSummaryUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}

  public cresateSummary(summaryData: data) {
    const data = {
      id: this.repository.getNextID(),
      ...summaryData
    }
    const newSum = SummaryCreator.createSummary(data)
    this.repository.create(newSum)
    return newSum
  }
}
export default createSummaryUC
