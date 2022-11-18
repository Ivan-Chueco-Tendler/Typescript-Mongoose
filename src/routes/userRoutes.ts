import express from 'express'
import { getUsers, getUserById, userRegister, userLogin } from '../services/userServices'
import { getErrorMessage, toAddUser } from '../utils'

const router = express.Router()

router.get('/', (req, res, next) => {
  const { id } = req.query
  if (typeof id !== 'string') next()
  else {
    getUserById(id).then(data => {
      res.json(data)
    }).catch(err => res.status(400).send(getErrorMessage(err)))
  }
})

router.get('/', (_req, res) => {
  getUsers().then(data => {
    res.json(data)
  }).catch(err => res.status(400).send(getErrorMessage(err)))
})

router.post('/register', (req, res) => {
  const newUser = toAddUser(req.body)
  userRegister(newUser).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(400).send(getErrorMessage(err))
  })
})

router.post('/login', (req, res) => {
  userLogin(req.body).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(400).send(getErrorMessage(err))
  })
})

export default router
