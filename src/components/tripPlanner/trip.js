import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { getFormattedTime } from '../../utils/date';
import Logger from 'js-logger';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
});

const Trip = ({
  origin,
  destination,
  destDate,
  origDate,
  fare,
  fares,
  leg,
  tripTime,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5">{getFormattedTime(origDate)}</Typography>
        <Typography variant="h5">{getFormattedTime(destDate)}</Typography>
      </div>
      <div>
        <Typography variant="body2">{origin?.name}</Typography>
        <Typography variant="caption">{origin?.address}</Typography>
        <Typography variant="body2">{destination?.name}</Typography>
        <Typography variant="caption">{destination?.address}</Typography>
      </div>
    </div>
  );
};

Trip.propTypes = {};

export default Trip;
