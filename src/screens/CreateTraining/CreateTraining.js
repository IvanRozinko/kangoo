import React, { useState, useEffect } from 'react'
import { 
  Box, Typography, TextField, makeStyles, Button,
  FormControlLabel, Checkbox
} from '@material-ui/core'
import { useHttp } from '../../hooks/http.hook';
import { DateTimePicker } from '@material-ui/pickers';
import Layout from '../../components/Layout/Layout'
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';


const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 0'
  },
  button: {
    marginTop: 50
  }
}))

function CreateTraining() {
  const classes = useStyles();
  const { request, loading, error, clearError } = useHttp();
  const [message, setMessage] = useState(null)
  const [names, setNames] = useState([]);
  const [form, setForm] = useState({
    location: '',
    datetime: null,
    members: [],
    notify: false
  })
  
  useEffect(() => {
    const getNames = async () => {
      const fetchedMembers = await request('/api/users')
      setNames(fetchedMembers)
    }
     getNames()
  }, [request])

  const handleInputChange = (event) => {
    const target = event.target;
    setForm({
      ...form,
      [target.name]: target[target.name === 'notify' ? 'checked' : 'value']
    })
  }

  const clearAllMessages = () => {
    clearError();
    setMessage(null);
  }

  const handleButtonClick = async () => {
    try { 
      const response = await request('/api/training/create', 'POST', {...form})
      setMessage(response.message)
    } catch(e) {}
  }

  const { location, datetime, members, notify } = form;
  return (
    <Layout
      bottomNavigation
      snackOpen={!!error || !!message}
      snackMsg={error || message}
      snackDisable={clearAllMessages}
    >
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        margin='0 10px'
      >
        <Typography variant='h4' align='center'>Додати тренування</Typography>
        <TextField 
          name="location"
          label="Локація"
          onChange={handleInputChange}
          value={location}
          fullWidth
          className={classes.input}
        />
        <DateTimePicker 
          value={datetime} 
          onChange={(value) => handleInputChange({target: {name: 'datetime', value}})} 
          ampm={false}
          disablePast={true}
          fullWidth
          format='d MMMM yyyy HH:mm'
          placeholder='Дата та час'
          className={classes.input}
        />
        <MultipleSelect 
          members={members}
          handleInputChange={handleInputChange}
          names={names}
          label='Кого повідомити'
        />
        <FormControlLabel
          className={classes.input}
          control={
            <Checkbox 
              checked={notify} 
              onChange={handleInputChange} 
              name="notify"
              color='primary'
            />
          }
          label="Відправити повідомлення"
        />
        <Button
          variant='contained'
          onClick={handleButtonClick}
          className={classes.button}
          disabled={loading}
        >
          Створити
        </Button>
      </Box>
    </Layout>
  )
}

export default CreateTraining
