import express from 'express'
import { SummaryController } from './summary/Presentation/Controllers/SummaryController'
const app = express()
const PORT = 3000
app.use(express.json())

const summaryController = SummaryController()

app.use('/summaries', summaryController)
app.get('/', (req, res) => {
  res.send('Hello World! 2')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
