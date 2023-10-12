import { Isummary } from './Isummary'

export class Summary implements Isummary {
  constructor(data: Isummary) {
    this.name = data.name
    this.id = data.id
  }

  name: string
  id: number
}
