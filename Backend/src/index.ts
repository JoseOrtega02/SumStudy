import express from 'express'

import authMiddleware from './Auth/firebase/auth-middleware'
import { UserHandler } from './User/Presentation/Handlers/UserHandler'
import { SummaryHandler } from './summary/Presentation/Handlers/SummaryHandler'
const app = express()
const PORT = 3000
app.use(express.json())

const summaryHandler = SummaryHandler()
const userHandler = UserHandler()
// app.use('/', authMiddleware)
app.use('/summaries', summaryHandler)
app.use('/users', userHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app
