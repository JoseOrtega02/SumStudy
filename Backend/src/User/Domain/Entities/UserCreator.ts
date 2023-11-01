import { Iuser } from './Iuser'
import { User } from './User'

export class UserCreator {
  static createUser(data: Iuser) {
    return new User(data)
  }
}
