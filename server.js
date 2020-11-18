import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use('/', express.static(path.join(path.resolve(), 'app', 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/deployContract', (req, res) => {
  console.log(req.body)
  res.send({ status: 'success' })
})

app.listen(port, () => console.info(`The app is listening on port ${port}`))
