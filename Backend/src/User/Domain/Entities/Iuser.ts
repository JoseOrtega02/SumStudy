import { UUID } from 'crypto'

export interface Iuser {
  name: string
  id: UUID
  email: string
  password: string
}
