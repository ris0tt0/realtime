import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { getFormattedTime } from '../../utils/date';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
  },
});

const Leg = ({ origin, destination, destDate, origDate, bikeflag, line }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="body2">{getFormattedTime(origDate)}</Typography>
        <Typography variant="body2">{getFormattedTime(destDate)}</Typography>
      </div>
      <Typography variant="body2">
        {line} bike:{bikeflag}
      </Typography>
      <div>
        <Typography variant="body2">{origin?.name}</Typography>
        <Typography variant="body2">{destination?.name}</Typography>
      </div>
    </div>
  );
};

Leg.propTypes = {};

export default Leg;
