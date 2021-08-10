import React from 'react'
import { Box } from '@material-ui/core'
import BottomNavigation from '../BottomNavigation/BottomNavigation'
import Appbar from '../Appbar/Appbar'
import SnackBar from '../SnackBar/SnackBar'

function Layout({ 
  children, bottomNavigation=false, snackOpen, snackMsg, snackDisable, withAppbar=true
}) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
    >
      {withAppbar && <Appbar />}
      {children}
      {bottomNavigation && 
        <BottomNavigation />
      }
      <SnackBar 
        open={snackOpen}
        message={snackMsg}
        onClose={snackDisable}
      />
    </Box>
  )
}

export default Layout
