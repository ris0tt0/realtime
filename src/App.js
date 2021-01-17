import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="caption">Hello from Jonathan</Typography>
    </Paper>
  );
};

export { App };
