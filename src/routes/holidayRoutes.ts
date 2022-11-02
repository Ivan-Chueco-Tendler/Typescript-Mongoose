import express from 'express'
import { getHolidays, filterByCountry, addHoliday, findById, updateHoliday, deleteHoliday } from '../services/holidayServices'
import { getErrorMessage, toAddHoliday } from '../utils'

const router = express.Router()

router.get('/', (req, res, next) => {
  const { id } = req.query
  if (typeof id !== 'string') next()
  else {
    findById(id).then(data => {
      res.json(data)
    }).catch(err => res.status(400).send(getErrorMessage(err)))
  }
})

router.get('/', (_req, res) => {
  getHolidays().then(data => {
    res.json(data)
  }).catch(err => res.status(400).send(getErrorMessage(err)))
})

router.get('/:country', (req, res) => {
  const { country } = req.params
  filterByCountry(country).then(data => {
    res.json(data)
  }).catch(err => res.status(400).send(getErrorMessage(err)))
})

router.put('/', (req, res) => {
  const updatedInfo = toAddHoliday(req.body)
  updateHoliday({ id: req.body.id, ...updatedInfo }).then(data => {
    res.json(data)
  }).catch(err => res.status(400).send(getErrorMessage(err)))
})

router.post('/', (req, res) => {
  const newHoliday = toAddHoliday(req.body)
  addHoliday(newHoliday).then(data => {
    res.json(data)
  }).catch(err => {
    res.status(400).send(getErrorMessage(err))
  })
})

router.delete('/', (req, res) => {
  const { id } = req.query
  if (typeof id !== 'string' || id === '') res.status(400).send('Query must be a string with a valid id')
  else {
    deleteHoliday(id).then(data => {
      res.send(data)
    }).catch(err => {
      res.status(404).send(getErrorMessage(err))
    })
  }
})

export default router
