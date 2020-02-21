import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
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
    margin: '1rem'
  },
  chip: {
    marginRight: 10
  }
});

function getIcon(value) {
  if (value.toLowerCase() === 'work') {
    return <BusinessCenterIcon />;
  } else if (value.toLowerCase() === 'personal') {
    return <FaceIcon />;
  }
}

function getSubheader(classes, created, label) {
  if (!created) {
    return null;
  }
  const date = format(new Date(created), 'MMMM dd, yyyy h:mm aaaa');

  return (
    <Box display="flex" flexDirection="row" mt={1}>
      <Box flexGrow={1}>
        {label.map((value, index) => (
          <Chip
            key={index}
            label={value}
            className={classes.chip}
            variant="outlined"
            size="small"
            icon={getIcon(value)}
            color={value.toLowerCase() === 'work' ? 'primary' : 'secondary'}
          />
        ))}
      </Box>
      <Typography variant="subtitle1">{date}</Typography>
    </Box>
  );
}

function NoteCard({ note, handleDeleteNote }) {
  const classes = useStyles();
  let history = useHistory();
  const { title, body, id, label, created } = note;

  const handleNoteEditOnClick = event => {
    event.preventDefault();
    history.push(`/edit/${id}`);
  };

  return (
    <Card raised className={classes.root}>
      <CardHeader
        title={title}
        subheader={getSubheader(classes, created, label)}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
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
    </Card>
  );
}

export default NoteCard;
