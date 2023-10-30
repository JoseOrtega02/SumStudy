import express from 'express'
import { SummaryController } from './summary/Presentation/Controllers/SummaryController'
import authMiddleware from './Auth/firebase/auth-middleware'
const app = express()
const PORT = 3000
app.use(express.json())

const summaryController = SummaryController()
app.use('/', authMiddleware)
app.use('/summaries', summaryController)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app
