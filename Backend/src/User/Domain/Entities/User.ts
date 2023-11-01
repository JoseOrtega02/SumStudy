import { Iuser } from './Iuser'

export class User {
  constructor(data: Iuser) {
    this.name = data.name
    this.id = data.id
    this.email = data.email
    this.password = data.password
  }
  name: string
  id: number
  email: string
  password: string
}
