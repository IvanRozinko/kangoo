import React, { useEffect, useState, useCallback } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useHttp } from '../../hooks/http.hook';
import { usePush } from '../../hooks/subscription.hook'

import Layout from '../../components/Layout/Layout'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import TrainingList from '../../components/TrainingList/TrainingList';
import Dialog from '../../components/Dialog/Dialog'

function Schedule() {
  const { subscribeUser } = usePush();
  const { request, error, clearError, loading } = useHttp();
  const [trainings, setTrainings] = useState([]);
  const [message, setMessage] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handlePushSubscription = useCallback(
    async () => {
      const user = await request('/api/users/user')
      if (user.allowNotifications) {
        setTimeout(() => setOpenDialog(true), 2000)
      }
    },
    [request]
  )

  const getNames = useCallback(async () => {
    const fetchedTrainings = await request('/api/training')
    setTrainings(fetchedTrainings)
  }, [request])

  useEffect(() => {
    getNames()
    handlePushSubscription()
  }, [getNames, handlePushSubscription])

  const handleAddButton = async (id) => {
    try {
      const data = await request('/api/training/tohistory', 'POST', { id }) 
      setMessage(data.message);
      getNames();
    } catch (e) {
      setMessage(e.message);
    }
  }

  const handleDeleteAction = async (id) => {
    try {
      const data = await request('/api/training/delete', 'POST', { id }) 
      setMessage(data.message);
      getNames();
    } catch (e) {
      setMessage(e.message);
    }
  }

  const clearAll = () => {
    setMessage(null);
    clearError();
  }


  const cancelNotificationDialog = async () => {
    await request('/api/users/update', 'POST', {
      allowNotifications: false
    })
  } 

  const handleCloseDialog = () => setOpenDialog(false)

  const handleAcceptAction = async () => {
    await cancelNotificationDialog()
    setOpenDialog(false)
    subscribeUser()
  }

  const handleCancelAction = async () => {
    await cancelNotificationDialog()
    handleCloseDialog()
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
        {loading && <ProgressBar />}
        <Typography variant='h4' align='center'>Всі заняття</Typography>
        <TrainingList 
          trainings={trainings}
          handleFirstAction={handleAddButton}
          handleDeleteAction={handleDeleteAction} 
          loading={loading}
        />
         <Dialog 
          open={openDialog}
          handleClose={handleCloseDialog}
          acceptAction={handleAcceptAction}
          cancelAction={handleCancelAction}
        />
      </Box>
    </Layout>
  )
}

export default Schedule
