import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { requestInitialData } from './actions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    margin: 0,
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper className={classes.root} elevation={0}>
      <Button
        variant="contained"
        size="small"
        onClick={() => dispatch(requestInitialData())}
      >
        start
      </Button>
    </Paper>
  );
};

export { App };
