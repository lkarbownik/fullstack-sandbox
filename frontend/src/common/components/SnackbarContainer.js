import React, { useState, useRef } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export const SnackbarContext = React.createContext()

const SnackbarContainer = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    open: false,
    severity: '',
    message: '',
  })

  const displaySnackbar = (message, severity = 'info') =>
    setState({
      severity: severity,
      message: message,
      open: true,
    })

  const ctx = useRef({ displaySnackbar })

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({ ...state, open: false })
  }

  return (
    <div className={classes.root}>
      <SnackbarContext.Provider value={ctx.current}>
        {props.children}
        <Snackbar
          open={state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity={state.severity}
          >
            {state.message}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
    </div>
  )
}

export default SnackbarContainer
