import { Holiday, User, Email } from './types'
import { HolidayTypes } from './enums'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  return String(error)
}

const parseName = (nameFromRequest: any): string => {
  if (typeof nameFromRequest !== 'string') {
    throw new Error('Missing or Incorrect name for new holiday')
  }
  return nameFromRequest
}

const parseDescription = (descFromRequest: any): string => {
  if (typeof descFromRequest !== 'string') {
    throw new Error('Missing or Incorrect description for new holiday')
  }
  return descFromRequest
}

const parseCountry = (countryFromRequest: any): string => {
  if (typeof countryFromRequest !== 'string') {
    throw new Error('Missing or Incorrect description for new holiday')
  }
  return countryFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (typeof dateFromRequest !== 'string') {
    if (!(dateFromRequest instanceof Date)) {
      throw new Error('Missing or Incorrect date for new holiday')
    }
    return dateFromRequest.toISOString().substring(0, 10)
  }
  return dateFromRequest
}

const parseType = (typeFromRequest: any): HolidayTypes[] => {
  if (!Array.isArray(typeFromRequest)) {
    throw new Error('Missing or Incorrect type/s for new holiday (Not an Array)')
  }
  if (!checkTypesArray(typeFromRequest)) {
    throw new Error('Missing or Incorrect type/s for new holiday (Not a correct type)')
  }
  return typeFromRequest
}

const checkTypesArray = (array: any[]): boolean => {
  const arrayWithTypes: HolidayTypes[] = array.filter(arg => Object.values(HolidayTypes).includes(arg))
  return (arrayWithTypes.length > 0 && arrayWithTypes.length === array.length)
}

const toAddHoliday = (object: any): Holiday => {
  const newHoliday: Holiday = {
    name: parseName(object.name),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    type: parseType(object.type),
    country: parseCountry(object.country)
  }
  return newHoliday
}

const parseEmail = (emailFromRequest: any): Email => {
  if (typeof emailFromRequest !== 'string' || emailFromRequest.split('@').length !== 2) {
    throw new Error('Missing or Incorrect email for new user')
  }
  return emailFromRequest as Email
}

const parseUsername = (usernameFromRequest: any): string => {
  if (typeof usernameFromRequest !== 'string') {
    throw new Error('Missing or Incorrect username for new user')
  }
  return usernameFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (typeof passwordFromRequest !== 'string') {
    throw new Error('Missing or Incorrect password for new user')
    // RegEx for minimum eight characters, at least one letter, one number and one special character:
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordFromRequest)) {
    throw new Error('Password should have minimum eight characters, at least one letter, one number and one special character')
  } else return passwordFromRequest
}

const toAddUser = (object: any): User => {
  const newUser: User = {
    email: parseEmail(object.email),
    username: parseUsername(object.username),
    password: parsePassword(object.password)
  }
  return newUser
}

export { toAddHoliday, toAddUser, getErrorMessage }
