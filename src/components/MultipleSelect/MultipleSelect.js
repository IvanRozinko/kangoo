import React from 'react'
import { 
  InputLabel, Select, MenuItem, 
  FormControl, Input, Chip, makeStyles
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2,
  }
})

const MenuProps = {
  PaperProps: { 
    style: {
      maxHeight: 300
    }
  }, 
  getContentAnchorEl: null,
  variant: 'menu'
}

function MultipleSelect({ members, handleInputChange, names, disabled=false, label }) {
  const classes = useStyles();
  const theme = useTheme();
  const getStyles = (id) => ({
    color: members.includes(id) ? theme.palette.primary.main : theme.palette.text.main
  })
  
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          disabled={disabled}
          value={members}
          onChange={handleInputChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {names.length > 0 && selected.map((value) => (
                <Chip 
                  key={value} 
                  label={names.find(member => member.id === value).name} 
                  className={classes.chip} 
                />
              ))}
            </div>
          )}
          fullWidth
          MenuProps={MenuProps}
          name="members"
        >
          {names.map(({ name, id, phone }) => (
            <MenuItem key={id} value={id} style={getStyles(id)}>
              <span>{name}</span>
              <div style={{ flex: 1 }} />
              <span>{phone}</span>
            </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultipleSelect
