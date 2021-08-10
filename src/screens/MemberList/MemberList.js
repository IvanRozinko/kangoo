import React, { useEffect, useState } from 'react'
import { 
  Box, List, ListItem, 
  ListItemAvatar, Avatar, ListItemText,
  ListItemSecondaryAction, IconButton, Typography,
  makeStyles
} from '@material-ui/core'
import { useHttp } from '../../hooks/http.hook';
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from '../../components/Layout/Layout'

const useStyle = makeStyles((theme) => ({
  primary: { 
    backgroundColor: theme.palette.primary.main
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main
  }
})
)
function MemberList() {
  const classes = useStyle();
  const { request, error, clearError } = useHttp();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getNames = async () => {
      const fetchedMembers = await request('/api/users')
      setMembers(fetchedMembers)
    }
     getNames()
  }, [request])

  return (
    <Layout
      bottomNavigation
      snackOpen={!!error}
      snackMsg={error}
      snackDisable={clearError}
    >
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        padding='0 10px'
      >
        <Typography variant='h4' align='center'>Учасники</Typography>
        <List>
          {members.map((member, index) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar
                  className={index % 2 === 0 ? classes.primary : classes.secondary}
                >{member.name[0].toUpperCase()} </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                secondary={member.phone}
              />
              <ListItemText primary={member.size}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            )
          )}
        </List>
      </Box>
    </Layout>
  )
}

export default MemberList
