import mongoose from 'mongoose'
import { User } from '../types'
import { holidaySchema } from './holiday'
const { Schema, model } = mongoose

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdHolidays: { type: [holidaySchema] }
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v
  }
})

const UserModel = model('User', userSchema)

export default UserModel
