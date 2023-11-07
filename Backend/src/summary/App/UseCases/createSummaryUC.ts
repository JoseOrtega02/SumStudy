import { IsummaryRepo } from 'src/summary/Infra/Repositories/IsummaryRepo'
import { Summary } from '../../Domain/Entities/Summary'
import { SummaryCreator } from '../../Domain/Entities/SummaryCreator'

class createSummaryUC {
  constructor(private readonly repository: IsummaryRepo<Summary>) {}

  public cresateSummary(
    name: string,
    pdf: string,
    sum_desc: string,
    subject: string,
    career: string,
    lenght: number,
    up_date: string,
    likes: number
  ) {
    const data = {
      id: this.repository.getNextID(),
      name: name,
      likes: likes,
      pdf: pdf,
      sum_desc: sum_desc,
      subject: subject,
      career: career,
      lenght: lenght,
      up_date: up_date
    }
    const newSum = SummaryCreator.createSummary(data)
    this.repository.create(newSum)
    return newSum
  }
}
export default createSummaryUC
