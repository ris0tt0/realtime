import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestInitialData } from './actions';
import { RealTimeDepartures } from './screens/real-time-departures';
import { Start } from './screens/start-page';
import {
  getAppDataIsInitLoaded,
  getAppDataIsInitLoadError,
  getAppDataIsRequesting,
} from './selectors';

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
  const isInitRequesting = useSelector(getAppDataIsRequesting);
  const isInitLoaded = useSelector(getAppDataIsInitLoaded);
  const isInitLoadedError = useSelector(getAppDataIsInitLoadError);

  if (isInitRequesting) {
    return (
      <Paper className={classes.root} elevation={0}>
        <CircularProgress />
      </Paper>
    );
  }

  if (isInitLoaded && !isInitLoadedError) {
    return (
      <Paper className={classes.root} elevation={0}>
        <RealTimeDepartures />
      </Paper>
    );
  }
  if (isInitLoadedError) {
    return (
      <Paper className={classes.root} elevation={0}>
        <Typography variant="body1">Error loading application</Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <Start onStart={() => dispatch(requestInitialData())} />
    </Paper>
  );
};

export { App };
