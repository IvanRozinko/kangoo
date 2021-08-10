import React from 'react'
import {
  BottomNavigation, BottomNavigationAction, AppBar, makeStyles
 } from '@material-ui/core'
import { Schedule, FitnessCenter }  from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  bottom: {
    top: 'auto',
    bottom: 0,
  }
})

function BottomNav() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e, value) => {
    history.push(value)
  }

  return (
    <AppBar className={classes.bottom} position='fixed' color='secondary'>
      <BottomNavigation value={location.pathname} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Мої тренування" value="/training" icon={<FitnessCenter />} />
        <BottomNavigationAction label="Розклад" value="/schedule" icon={<Schedule />} />
      </BottomNavigation>
    </AppBar>
  )
}

export default BottomNav
