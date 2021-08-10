import React, { useEffect, useState, useCallback } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useHttp } from '../../hooks/http.hook'
import Layout from '../../components/Layout/Layout'
import TrainingList from '../../components/TrainingList/TrainingList';
import ProgressBar from '../../components/ProgressBar/ProgressBar'


function Training() {
  const { request, error, clearError, loading } = useHttp();
  const [trainings, setTrainings] = useState([]);
  const [message, setMessage] = useState(null)

  const getNames = useCallback(
    async () => {
      const fetchedTrainings = await request('/api/training/my')
      setTrainings(fetchedTrainings)
    },
     [request]
  )

  useEffect(() => {
     getNames()
  }, [getNames])

  const handleRemoveTraining = async (id) => {
    try {
      const data = await request('/api/training/unschedule', 'POST', { id })
      setMessage(data.message)
      getNames();
    } catch (e) {
  
    }
  }

  const clearAll = () => {
    setMessage(null)
    clearError()
  }

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
        overflowy='scroll'
      >
        {loading && <ProgressBar /> }
        <Typography variant="h4" align='center'>Мої тренування</Typography>
        <TrainingList 
          trainings={trainings}
          isMemberClasses
          handleFirstAction={handleRemoveTraining}
          loading={loading}
        />
      </Box>
    </Layout>
  )
}

export default Training 
