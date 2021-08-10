import React from 'react'
import { Snackbar } from '@material-ui/core'

function SnackBar({ open, message, onClose }) {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={2500}
      message={message}
      onClose={onClose}
    />
  )
}

export default SnackBar
