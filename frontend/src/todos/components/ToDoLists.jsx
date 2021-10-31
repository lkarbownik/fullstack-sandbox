import React, { Fragment, useState, useEffect, useContext } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { ToDoListForm } from 'todos/components/ToDoListForm'
import ToDoListAPI from 'todos/services/ToDoListAPI'
import { SnackbarContext } from 'common/components/SnackbarContainer'

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState([])
  const [activeList, setActiveList] = useState()
  const { displaySnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    ToDoListAPI.fetch()
      .then((toDoLists) => setToDoLists(toDoLists))
      .catch(() => {
        displaySnackbar(
          'There was an error while communicating with API',
          'error'
        )
      })
  }, [displaySnackbar])

  if (!Object.keys(toDoLists).length) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {toDoLists.map((list) => (
              <ListItem
                key={list.id}
                button
                onClick={() =>
                  setActiveList(toDoLists.find((l) => l.id === list.id))
                }
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {activeList && (
        <ToDoListForm
          toDoListId={activeList.id}
          toDoListTitle={activeList.title}
        />
      )}
    </Fragment>
  )
}
