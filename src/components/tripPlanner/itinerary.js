import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'js-logger';
import { makeStyles, Typography } from '@material-ui/core';
import { getFormattedTime } from '../../utils/date';
import Trip from './trip';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  station: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  trip: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const Itinerary = ({
  origin = null,
  destination = null,
  date = null,
  trips = [],
}) => {
  const classes = useStyles();

  if (origin === null) {
    return null;
  }

  Logger.info(trips);

  return (
    <div className={classes.root}>
      <div className={classes.station}>
        <div>
          <Typography variant="h5">{origin.name}</Typography>
          <Typography variant="caption">{origin.address}</Typography>
        </div>
        <div>
          <Typography variant="h5">{destination.name}</Typography>
          <Typography variant="caption">{destination.address}</Typography>
        </div>
        <Typography variant="caption">{getFormattedTime(date)}</Typography>
      </div>
      <div className={classes.trip}>
        {trips.map((item, index) => (
          <Trip key={`-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

Itinerary.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  date: PropTypes.object,
  trips: PropTypes.array,
};

export { Itinerary };
