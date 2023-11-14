import { UUID } from 'crypto'
import { Iuser } from './Iuser'

export class User {
  constructor(data: Iuser) {
    this.name = data.name
    this.id = data.id
    this.email = data.email
    this.password = data.password
  }
  name: string
  id: UUID
  email: string
  password: string
}
