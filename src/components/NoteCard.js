import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  Card,
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { format } from 'date-fns';

const useStyles = makeStyles({
  root: {
    borderRadius: '1rem',
    margin: '1rem 0'
  },
  chip: {
    marginRight: '0.5rem'
  },
  grow: {
    flexGrow: 1
  }
});

function getColor(value) {
  if (value.toLowerCase() === 'work') {
    return 'primary';
  } else if (value.toLowerCase() === 'personal') {
    return 'secondary';
  }
}

function getIcon(value) {
  if (value.toLowerCase() === 'work') {
    return <BusinessCenterIcon />;
  } else if (value.toLowerCase() === 'personal') {
    return <FaceIcon />;
  }
}

function getSubheader(classes, label) {
  if (!label) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="row" mt={2}>
      {label.map((value, index) => (
        <Chip
          key={index}
          label={value}
          className={classes.chip}
          variant="outlined"
          size="small"
          icon={getIcon(value)}
          color={getColor(value)}
        />
      ))}
    </Box>
  );
}

function NoteCard({ note, handleDeleteNote, user }) {
  const classes = useStyles();
  let history = useHistory();
  const { title, body, id, label, created, username } = note;
  const date = format(new Date(created), 'MMMM dd, yyyy h:mm aaaa');

  const handleNoteEditOnClick = event => {
    event.preventDefault();
    history.push(`/edit/${id}`);
  };

  const displayName = username ? username : 'Anonymous';
  const avatarLabel = displayName.charAt(0).toUpperCase();

  return (
    <Card raised className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatarLabel}
          </Avatar>
        }
        action={getSubheader(classes, label)}
        title={title}
        subheader={displayName}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>

      <Box className={classes.grow} mx={1}>
        <CardActions>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.grow}
          >
            {date}
          </Typography>
          <IconButton aria-label="edit" onClick={handleNoteEditOnClick}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={event => handleDeleteNote(id, event)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
}

export default NoteCard;
