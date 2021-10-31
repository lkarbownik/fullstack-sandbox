import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Button, Typography } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import format from 'date-fns/format'
import { formatDistanceToNowStrict, isPast } from 'date-fns'

const useStyles = makeStyles({
  todo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  standardSpace: {
    margin: '8px',
  },
  textField: {
    flexGrow: 1,
    marginLeft: '8px',
  },
})

export const formatMUIDate = (date) => {
  if (!date) {
    return ''
  }

  let parsed = new Date(date)

  return format(parsed, 'yyyy-MM-dd')
}

export const formatRemainingTime = (date) => {
  if (!date) {
    return ''
  }

  const dueDateObj = new Date(date)

  if (isPast(dueDateObj)) {
    return 'Overdue'
  } else {
    return formatDistanceToNowStrict(dueDateObj)
  }
}

const ToDo = ({ index, toDo, onChange, onDelete }) => {
  const classes = useStyles()
  const [title, setTitle] = useState(toDo.title)
  const remainingTime = formatRemainingTime(toDo.dueDate)
  const onTitleChange = () =>
    onChange({
      ...toDo,
      title,
    })
  const onStatusChange = (event) =>
    onChange({
      ...toDo,
      done: event.target.checked,
    })
  const onDueDateChange = (event) =>
    onChange({
      ...toDo,
      dueDate: event.target.value ? event.target.value : null,
    })

  return (
    <div key={index} className={classes.todo}>
      <Typography className={classes.standardSpace} variant="h6">
        {index}
      </Typography>
      <Checkbox checked={toDo.done} onChange={onStatusChange} />
      <TextField
        label="What to do?"
        value={title}
        onBlur={onTitleChange}
        onChange={(event) => setTitle(event.target.value)}
        className={classes.textField}
      />
      <TextField
        label="Due date"
        value={formatMUIDate(toDo.dueDate)}
        type="date"
        onChange={onDueDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Remaining time"
        value={remainingTime}
        disabled
        type="text"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        size="small"
        color="secondary"
        className={classes.standardSpace}
        onClick={onDelete}
      >
        <DeleteIcon />
      </Button>
    </div>
  )
}

export default ToDo
