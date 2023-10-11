import express from 'express'
const app = express()
const PORT = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! 2')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
