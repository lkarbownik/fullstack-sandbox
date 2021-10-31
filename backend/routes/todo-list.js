const { Router } = require('express')

const db = require('../models')

const router = Router()

router.get('/', async (_, res) => {
  try {
    const todoLists = await db.TodoList.findAll()

    res.json(todoLists)
  } catch (error) {
    next(error)
  }
})

module.exports = router
