import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { getFormattedTime } from '../../utils/date';
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTimeTwoTone';
import Logger from 'js-logger';
import Leg from './leg';

const useStyles = makeStyles({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  details: {
    display: 'flex',
  },
  leg: {},
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
      <div className={classes.header}>
        <div>
          <Typography variant="h5">{getFormattedTime(origDate)}</Typography>
          <Typography variant="h5">{getFormattedTime(destDate)}</Typography>
        </div>
        <div className={classes.details}>
          <div className={classes.details}>
            <AccessTimeTwoToneIcon fontSize="small" />
            <Typography variant="body1">{tripTime}</Typography>
          </div>
          <div className={classes.details}>
            <AttachMoneyTwoToneIcon fontSize="small" />
            <Typography variant="body1">{fare}</Typography>
          </div>
        </div>
        <div>
          <Typography variant="body2">{origin?.name}</Typography>
          <Typography variant="caption">{origin?.address}</Typography>
          <Typography variant="body2">{destination?.name}</Typography>
          <Typography variant="caption">{destination?.address}</Typography>
        </div>
      </div>
      <div className={classes.leg}>
        {leg.map((leg, index) => (
          <Leg key={`leg_${index}`} {...leg} />
        ))}
      </div>
    </div>
  );
};

Trip.propTypes = {};

export default Trip;
