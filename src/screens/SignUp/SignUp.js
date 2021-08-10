import React, { useState, useContext } from 'react'
import { 
  TextField, Box, Typography, Button, makeStyles
} from '@material-ui/core'; 
import { useHttp } from '../../hooks/http.hook';
import Layout from '../../components/Layout/Layout'
import Select from '../../components/Select/Select'
import { SHOE_SIZES } from '../../constants/constants'
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: 10
  },
  button: {
    minWidth: '50%',
  }
}))

function SignUp() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    password: '',
    phone: '',
    size: ''
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
      const createdUser = await request('/api/auth/register', 'POST', {...form})
      auth.login(createdUser.token, createdUser.userId, createdUser.isTrainer);
    } catch (e) {
      console.log(e)
    }
  }

  const { login, password, phone, size } = form;

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
          Реєстрація
        </Typography>
        <Box
          margin='0 20px'
        >
          <TextField 
            name="phone"
            label="Номер телефона"
            onChange={handleInputChange}
            value={phone}
            fullWidth
            className={classes.input}
          />
          <TextField 
            name="name"
            label="Ім'я"
            onChange={ handleInputChange}
            value={login}
            fullWidth
            className={classes.input}
          />
          <Select 
            handleInputChange={handleInputChange}
            value={size}
            items={SHOE_SIZES}
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
          Створити запис
        </Button>
      </Box>
    </Layout>
  )
}

export default SignUp
