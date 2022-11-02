import express from 'express'
import holidayRouter from './routes/holidayRoutes'
import config from './config'
import cors from 'cors'
const { PORT } = config
require('./mongo')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/holidays', holidayRouter)

app.listen(PORT, () => {
  console.log(`App is running in port ${config.PORT}`)
})
