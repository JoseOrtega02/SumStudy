import { Isummary } from './Isummary'
import { Summary } from './Summary'

export class SummaryCreator {
  static createSummary(data: Isummary) {
    return new Summary(data)
  }
}
