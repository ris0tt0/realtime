import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { getFormattedTime, getTimeMeridian } from '../../utils/date';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const TimeStandard = ({ date }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" component="span">
        <Typography variant="h5" component="span">
          {getFormattedTime(date)}
        </Typography>{' '}
        {getTimeMeridian(date)}
      </Typography>
    </div>
  );
};
