import { Holiday, SpecificCountryHoliday } from '../types'
import { HolidayModel } from '../models/holiday'
import { getErrorMessage } from '../utils'

export const getHolidays = async (): Promise<Holiday[]> => {
  const holidayData = await HolidayModel.find({})
  return holidayData
}

export const filterByCountry = async (country: string): Promise<SpecificCountryHoliday[]> => {
  const holidaysFiltered: Holiday[] = await HolidayModel.find({ country }, 'name description date type').exec()
  return holidaysFiltered
}

export const findById = async (id: string): Promise<Holiday | Error> => {
  try {
    const holidayById: any = HolidayModel.findById(id)
    if (holidayById === null) throw new Error('No holiday found with that id')
    return holidayById
  } catch (err) {
    console.error(err)
    throw new Error(getErrorMessage(err))
  }
}

export const addHoliday = async ({ name, description, date, type, country }: Holiday): Promise<Holiday> => {
  try {
    const newHoliday: Holiday = {
      name,
      description,
      date,
      type,
      country
    }
    await HolidayModel.create(newHoliday)
    return newHoliday
  } catch (err) {
    console.error(err)
    throw new Error(getErrorMessage(err))
  }
}

export const updateHoliday = async ({ id, name, description, date, type, country }: any): Promise<Holiday | string> => {
  const outdatedHoliday = await HolidayModel.findById(id)
  if (outdatedHoliday === null) throw new Error('No holiday found with that Id')
  else {
    const updatedInfo: Holiday = {
      name: name ?? outdatedHoliday.name,
      description: description ?? outdatedHoliday.description,
      date: date ?? outdatedHoliday.date,
      type: type ?? outdatedHoliday.type,
      country: country ?? outdatedHoliday.country
    }

    const updatedHoliday = await HolidayModel.findByIdAndUpdate(id, updatedInfo, { new: true })
    if (updatedHoliday === null) throw new Error(`Error in update of ${updatedInfo.name}`)
    else return updatedHoliday
  }
}

export const deleteHoliday = async (id: string): Promise<string> => {
  try {
    const deletedHoliday = await HolidayModel.findByIdAndDelete(id)
    if (deletedHoliday === null) throw new Error('No Holiday found with that Id')
    else return (`${deletedHoliday.name} has been deleted`)
  } catch (err) {
    throw new Error(getErrorMessage(err))
  }
}
