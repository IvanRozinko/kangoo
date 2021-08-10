import React from 'react'
import { Menu as MUIMenu, MenuItem } from '@material-ui/core'

function Menu({ anchorEl, onClose, handleMenuItemClick }) {
  return (
    <MUIMenu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => handleMenuItemClick('/create')}>Нове тренування</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/members')}>Учасники</MenuItem>
    </MUIMenu>
  )
}

export default Menu
