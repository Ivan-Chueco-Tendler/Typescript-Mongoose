import mongoose from 'mongoose'
// import { HolidayTypes } from '../enums'
import { Holiday } from '../types'
const { Schema, model } = mongoose

export const holidaySchema = new Schema<Holiday>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: [String], required: true },
  country: { type: String, required: true }

})

holidaySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const HolidayModel = model('Holiday', holidaySchema)
