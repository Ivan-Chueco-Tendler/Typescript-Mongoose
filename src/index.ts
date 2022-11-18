import express from 'express'
import holidayRouter from './routes/holidayRoutes'
import userRouter from './routes/userRoutes'
import config from './config'
import cors from 'cors'
const { PORT } = config
require('./mongo')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/holidays', holidayRouter)

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`App is running in port ${config.PORT}`)
})
