import React, { useState, useContext } from 'react'
import { 
  TextField, Box, Typography, Button, makeStyles
} from '@material-ui/core'; 
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/Layout/Layout'

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: 10
  },
  button: {
    minWidth: '50%',
  }
}))

function Login() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    phone: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const target = e.target;
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const handleButtonClick = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      if (data.token) {
        auth.login(data.token, data.userId, data.isTrainer)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSignUp = () => history.push('/signup')

  const { phone, password } = form;

  return (
    <Layout
      snackOpen={!!error}
      snackMsg={error}
      snackDisable={clearError}
      withAppbar={false}
    >
      <Box
        display='flex'
        flex='1'
        alignItems='center'
        justifyContent='space-around'
        flexDirection='column'
      >
        <Typography variant='h3'>
          Kangoo App
        </Typography>
        <Box
          margin='0 20px'
        >
          <TextField 
            name="phone"
            label="Номер телефону"
            onChange={handleInputChange}
            value={phone}
            fullWidth
            className={classes.input}
          />
          <TextField 
            name="password"
            label="Пароль"
            onChange={handleInputChange}
            value={password}
            fullWidth
            type='password'
            className={classes.input}
          />
        </Box>
        <Button
          onClick={handleButtonClick}
          variant='contained'
          className={classes.button}
          disabled={loading}
        >
          Вхід
        </Button>
        <Button
          onClick={handleSignUp}
          variant='text'
          className={classes.button}
        >
          Реєстрація
        </Button>
      </Box>
    </Layout>
  )
}

export default Login
