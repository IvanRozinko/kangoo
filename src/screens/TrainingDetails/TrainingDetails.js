import React,{ 
  useEffect, useState, useContext, useCallback 
} from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { 
  Box, TextField, Typography, Button,
  makeStyles
} from '@material-ui/core'
import Layout from '../../components/Layout/Layout'
import Skeleton from '../../components/ProgressBar/ProgressBar'
import { DateTimePicker } from '@material-ui/pickers'
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 0'
  },
  button: {
    marginTop: 50
  }
}))

function TrainingDetails() {
  const classes = useStyles();
  const { isTrainer } = useContext(AuthContext);
  const { pathname } = useLocation();
  const { request, error, loading, clearError } = useHttp();
  const [form, setForm] = useState({
    location: '',
    datetime: null,
    members: []
  })
  const [names, setNames] = useState([]);
  const [message, setMessage] = useState();

  const getTraining = useCallback(async () => {
    try {
      const data = await request(`/api${pathname}`)
      setForm(data)
    } catch (e) {
      setMessage(e.message)
    }
  }, [request, pathname])

  const getNames = useCallback(async () => {
    const data = await request('/api/users')
    setNames(data)
  }, [request])

  useEffect(() => {
    getTraining()
    getNames()
  }, [getTraining, getNames])

  
  const handleInputChange = (event) => {
    const target = event.target;
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const handleButtonClick = async () => {
    try {
      let data = {};
      if (isTrainer) {
        data = await request('/api/training/update', 'POST', { ...form })
      } else {
        data = await request('/api/training/tohistory', 'POST', { id: pathname.split('/').pop() })
      }
      setMessage(data.message)
    } catch (e) {
      setMessage(e.message)
    }
  }

  const clearAll = () => {
    setMessage(null)
    clearError()
  }

  const { location, datetime, members } = form;

  return (
    <Layout
      bottomNavigation
      snackOpen={!!error || !!message}
      snackMsg={error || message}
      snackDisable={clearAll}
    >
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        padding='0 10px'
      >
        {loading && <Skeleton />}
        <Typography variant="h4" align='center'>Деталі тренування</Typography>
        <Box
          marginTop={4}
          display='flex'
          flexDirection='column'
        >
          <TextField  
            label="Локація" 
            value={location}
            disabled={!isTrainer}
            fullWidth
          />
          <DateTimePicker 
            value={datetime} 
            onChange={(value) => handleInputChange({target: {name: 'datetime', value}})} 
            ampm={false}
            disablePast={true}
            disabled={!isTrainer}
            fullWidth
            format='d MMMM yyyy HH:mm'
            placeholder='Дата та час'
            className={classes.input}
          />
          <MultipleSelect 
            members={members}
            handleInputChange={handleInputChange}
            names={names}
            disabled={!isTrainer}
            label='Учасники'
          />
          <Button
            variant='contained'
            onClick={handleButtonClick}
            className={classes.button}
            disabled={loading}
          >
            {isTrainer ? 'Зберегти' : 'Підтвердити'}
          </Button>
        </Box>
      </Box>
      
    </Layout>
  )
}

export default TrainingDetails
