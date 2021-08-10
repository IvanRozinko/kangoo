import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router';
import { 
  List, ListItem, makeStyles,
  ListItemAvatar, Avatar, ListItemText,
  ListItemSecondaryAction, IconButton, Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import TrainingIcon from '@material-ui/icons/FitnessCenter';

const useStyle = makeStyles((theme) => ({
  primary: { 
    backgroundColor: theme.palette.text.disabled,
    marginBottom: 10
  },
  secondary: {
    backgroundColor: theme.palette.text.secondary,
    marginBottom: 10
  },
  list: {
    overflowY: 'scroll',
    paddingBottom: '72px',
    "&::-webkit-scrollbar": {
      display: 'none'
    }
  }
}))

function TrainingList({ 
  trainings, handleFirstAction, isMemberClasses=false, handleDeleteAction, loading
}) {
  const history = useHistory();
  const { isTrainer } = useContext(AuthContext);
  const classes = useStyle();

  const humanDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString('uk-UA')} ${date.toLocaleTimeString('uk-UA')}`
  }
  
  const handleItemClick = (id) => {
    history.push(`/training/${id}`)
  }

  return (
    <List className={classes.list}>
      {trainings.length > 0 ? (
         trainings.map((training, index) => (
          <ListItem
            key={training._id} 
            className={index % 2 === 0 ? classes.primary : classes.secondary}
            onClick={() => handleItemClick(training._id)}
          >
            <ListItemAvatar>
              <Avatar variant='square'>
                <TrainingIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={training.location}
              secondary={humanDateTime(training.datetime)}
            />
            <ListItemText
              primary={training.members.length}
            />
            <ListItemSecondaryAction>
              {isTrainer ? (
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={() => handleDeleteAction(training._id)}
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton 
                  edge="end"
                  aria-label="add" 
                  onClick={() => handleFirstAction(training._id)}
                  disabled={loading}
                >
                  {isMemberClasses 
                    ? <MinusIcon />
                    : <AddIcon />
                  }
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          )
        )
      ) : (
        <Typography 
          variant="h6" 
          align='center'
        >
          Поки що їх немає, гоу додавай у "Розкладі"
        </Typography>
      )}
  </List>
  )
}

export default TrainingList
