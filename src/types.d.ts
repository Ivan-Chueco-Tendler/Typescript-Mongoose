
import { HolidayTypes } from './enums'

export interface Holiday {
  name: string
  description: string
  date: string
  type: HolidayTypes[]
  country: string
}

export type SpecificCountryHoliday = Omit<Holiday, 'country'>
