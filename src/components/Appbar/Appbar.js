import React, { useContext, useState, useEffect } from 'react'
import { 
  AppBar, Toolbar, IconButton,
  Typography, Button, makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { AuthContext } from '../../context/AuthContext';
import Menu from '../Menu/Menu'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  appbar: {
    justifyContent: 'space-between'
  }
})

function Appbar() {
  const classes = useStyles();
  const { isAuthenticated, logout, isTrainer } = useContext(AuthContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', message => {
        if (message.data.type === 'NOTIFICATION_CLICK') {
          console.log(message.data )
          history.push(`/training/${message.data.trainingId}`)
        }
      })
    }
  }, [history])

  const handleClick =(event) => {
    event.preventDefault();
    logout();
  }

  const onMenuClose = () => setAnchorEl(null);

  const handleMenuItemClick = (path) => {
    onMenuClose();
    history.push(path)
  }
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.appbar}>
        <IconButton 
          edge="start"  
          color="inherit" 
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Kangoo App
        </Typography>
        {isAuthenticated && 
          <Button 
            color="inherit"
            onClick={handleClick}  
          >
            Вийти
          </Button>
        }
      </Toolbar>
      {isTrainer && 
        <Menu 
          anchorEl={anchorEl}
          onClose={onMenuClose}
          handleMenuItemClick={handleMenuItemClick}
       />
      }
     
    </AppBar>
  )
}

export default Appbar
