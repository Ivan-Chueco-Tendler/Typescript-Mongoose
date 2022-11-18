
import { HolidayTypes } from './enums'

export interface Holiday {
  name: string
  description: string
  date: string
  type: HolidayTypes[]
  country: string
}

export type SpecificCountryHoliday = Omit<Holiday, 'country'>

export type Email = `${string}@${string}`

export interface User {
  email: Email
  username: string
  password: string
  createdHolidays?: Holiday[]
}

export interface UserId extends Omit<User, 'password'> {
  _id: ObjectId
}

export type UserLogin = Omit<User, 'username' | 'createdHolidays'>
