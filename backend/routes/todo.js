const { Router } = require('express')
const { ValidationError } = require('sequelize')

const db = require('../models')

const router = Router()

router.get('/', async (req, res, next) => {
  const where = {}

  if (req.query.todoListId) {
    where.todoListId = req.query.todoListId
  }

  try {
    const todos = await db.Todo.findAll({ where })

    res.json(todos)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const newTodo = req.body
  let todo

  try {
    const todoList = await db.TodoList.findOne({
      where: {
        id: newTodo.todoListId,
      },
    })

    if (!todoList) {
      return res.status(404).end()
    }

    todo = await db.Todo.create(newTodo)
    todo.setTodoList(todoList)
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).end()
    }

    next(error)
  }

  res.status(201).json(todo)
})

router.get('/:id', async (req, res, next) => {
  let todo

  try {
    todo = await db.Todo.findOne({
      where: {
        id: req.params.id,
      },
    })
  } catch (error) {
    next(error)
  }

  if (!todo) {
    return res.status(404).end()
  }

  res.json(todo)
})

router.put('/:id', async (req, res, next) => {
  const updatedTodo = req.body

  try {
    const todo = await db.Todo.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!todo) {
      return res.status(404).end()
    }

    await todo.update(updatedTodo)

    res.json(todo)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  let todo

  try {
    todo = await db.Todo.findOne({
      where: {
        id: req.params.id,
      },
    })
  } catch (error) {
    next(error)
  }

  if (!todo) {
    return res.status(404).end()
  }

  await todo.destroy()

  return res.status(200).end()
})

module.exports = router
