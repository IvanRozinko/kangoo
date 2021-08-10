import React from 'react'
import { 
  FormControl, Select as MUISelect,
  InputLabel, MenuItem, makeStyles
} from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    marginBottom: 10
  }
}))

function Select({ value, handleInputChange, items }) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Розмір взуття</InputLabel>
      <MUISelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleInputChange}
        name="size"
      >
        {items.map(item => 
          <MenuItem
            key={item.value} 
            value={item.value}
          >
            {`"${item.value}" - відповідає ${item.range}`} 
           </MenuItem> 
          )}
      </MUISelect>
    </FormControl>
  )
}

export default Select
