import React from 'react'
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core'
import Layout from '../../components/Layout/Layout'

function Home() {

  return (
    <Layout>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
      >
        <h1>Home</h1>
        <Link to='/login'>to Login</Link>
      </Box>
    </Layout>
  )
}

export default Home
