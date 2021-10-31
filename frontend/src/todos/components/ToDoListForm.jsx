import React, { useState, useEffect, useCallback, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { v4 as uuid } from 'uuid'
import ToDoAPI from 'todos/services/ToDoAPI'
import ToDo from 'todos/components/ToDo'
import { SnackbarContext } from 'common/components/SnackbarContainer'

const useStyles = makeStyles({
  card: {
    margin: '1rem',
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
})

export const ToDoListForm = ({ toDoListId, toDoListTitle }) => {
  const classes = useStyles()
  const [toDos, setToDos] = useState([])
  const [fetchTrigger, setFetchTrigger] = useState(uuid())
  const { displaySnackbar } = useContext(SnackbarContext)
  const errorHandler = useCallback(
    () =>
      displaySnackbar(
        'There was an error while communicating with API',
        'error'
      ),
    [displaySnackbar]
  )

  useEffect(() => {
    ToDoAPI.get({ toDoListId })
      .then((todos) => {
        setToDos(todos)
      })
      .catch(errorHandler)
  }, [toDoListId, fetchTrigger, errorHandler])

  const handleSubmit = (event) => event.preventDefault()
  const triggerFetch = () => setFetchTrigger(uuid())
  const deleteToDo = (id) =>
    ToDoAPI.delete(id).then(triggerFetch).catch(errorHandler)
  const createToDo = (toDo) =>
    ToDoAPI.create(toDo).then(triggerFetch).catch(errorHandler)
  const updateToDo = (toDo) =>
    ToDoAPI.update(toDo).then(triggerFetch).catch(errorHandler)

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">{toDoListTitle}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {toDos.map((toDo, index) => (
            <ToDo
              key={toDo.id}
              index={index + 1}
              toDo={toDo}
              onChange={updateToDo}
              onDelete={() => deleteToDo(toDo.id)}
            />
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                createToDo({ todoListId: toDoListId, title: '' })
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
