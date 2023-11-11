import express from 'express'

import authMiddleware from './Auth/firebase/auth-middleware'
import { UserController } from './User/Presentation/Controllers/UserController'
import { SummaryHandler } from './summary/Presentation/Handlers/SummaryHandler'
const app = express()
const PORT = 3000
app.use(express.json())

const summaryHandler = SummaryHandler()
const usersController = UserController()
// app.use('/', authMiddleware)
app.use('/summaries', summaryHandler)
app.use('/users', usersController)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app
