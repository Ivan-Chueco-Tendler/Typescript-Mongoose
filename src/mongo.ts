import mongoose from 'mongoose'
import config from './config'
import { getErrorMessage } from './utils'
import holidaysAR from './services/holidays.json'
import holidayModel from './models/holiday'
import { Holiday } from './types'
const { MONGO_URI } = config

mongoose.connect(MONGO_URI).then(async () => {
  console.log('DB connected!')
  const infoCheck: Holiday[] = await holidayModel.find({})
  holidayModel.insertMany(holidaysAR, (err, _docs) => {
    if (infoCheck.length > 0) {
      console.log('DB already has data')
    } else {
      if (err !== null) {
        console.error(getErrorMessage(err))
      } else {
        console.log('Holidays inserted!')
      }
    }
  })
}).catch(err => {
  console.error(getErrorMessage(err))
})
