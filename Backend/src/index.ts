import express from 'express'
import { SummaryController } from './summary/Presentation/Controllers/SummaryController'
import authMiddleware from './Auth/firebase/auth-middleware'
import { UserController } from './User/Presentation/Controllers/UserController'
const app = express()
const PORT = 3000
app.use(express.json())

const summaryController = SummaryController()
const usersController = UserController()
// app.use('/', authMiddleware)
app.use('/summaries', summaryController)
app.use('/users', usersController)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app
