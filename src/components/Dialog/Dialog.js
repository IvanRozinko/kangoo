import React from 'react'
import {
  Dialog as MUIDialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button
} from '@material-ui/core'

function Dialog({ 
  open, handleClose, acceptAction, cancelAction
}) {
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Kangoo App бажає спілкуватись</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Застосунок хоче повідомляти, про нові тренування від тренера.
          Бажаєте бути в курсі?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={acceptAction} color="primary" variant='contained'>
          Прийняти
        </Button>
        <Button onClick={cancelAction} color="secondary" variant='outlined'>
          Відхилити
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}

export default Dialog
