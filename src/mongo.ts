import mongoose from 'mongoose'
import config from './config'
import { getErrorMessage } from './utils'
import holidaysAR from './services/holidays.json'
import { HolidayModel } from './models/holiday'
import { Holiday } from './types'
require('./models/user')
const { MONGO_URI } = config

mongoose.connect(MONGO_URI).then(async () => {
  console.log('DB connected!')
  const infoCheck: Holiday[] = await HolidayModel.find({}).limit(1)
  if (infoCheck.length > 0) {
    return console.log('DB already has data')
  } else {
    HolidayModel.insertMany(holidaysAR, (err, _docs) => {
      if (err !== null) {
        console.error(getErrorMessage(err))
      } else {
        console.log('Holidays inserted!')
      }
    })
  }
}).catch(err => {
  console.error(getErrorMessage(err))
})
