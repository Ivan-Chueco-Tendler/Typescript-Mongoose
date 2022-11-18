import { User, UserLogin, UserId } from '../types'
import UserModel from '../models/user'
import { getErrorMessage } from '../utils'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
const { SECRET_KEY, EXPIRES_IN } = config

export const getUsers = async (): Promise<UserId[]> => {
  const usersArray: UserId[] = await UserModel.find({}, '-password')
  return usersArray
}

export const getUserById = async (id: string): Promise<UserId> => {
  const userById: UserId | null = await UserModel.findById(id, '-password')
  if (userById === null) throw new Error('No user found with that id')
  return userById
}

export const userRegister = async ({ email, username, password }: User): Promise<UserId> => {
  try {
    const createdUser: User = {
      email,
      username,
      password: await bcrypt.hash(password, await bcrypt.genSalt(12)),
      createdHolidays: []
    }
    const userCheck = await UserModel.findOne(createdUser)
    if (userCheck === null) throw new Error(`User ${username} already exists`)
    else {
      await UserModel.create(createdUser)
      return {
        _id: userCheck._id,
        email,
        username,
        createdHolidays: []
      }
    }
  } catch (err) {
    console.error(err)
    throw new Error(getErrorMessage(err))
  }
}

export const userLogin = async ({ email, password }: UserLogin): Promise<string> => {
  try {
    const userCheck: User | null = await UserModel.findOne({ email })
    if (userCheck === null) throw new Error('Data entered is incorrect')
    else if (!await bcrypt.compare(password, userCheck.password)) throw new Error('Data entered is incorrect')
    else {
      return jwt.sign({
        username: userCheck.username,
        createdHolidays: userCheck.createdHolidays,
        status: 'User'
      }, SECRET_KEY, { expiresIn: EXPIRES_IN })
    }
  } catch (err) {
    console.error(err)
    throw new Error(getErrorMessage(err))
  }
}
