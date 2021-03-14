import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import {
  getFormattedTime,
  getFormattedTimeDifference,
  getTimeMeridian,
} from '../../utils/date';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  color: {
    width: '10px',
    backgroundColor: ({ hexcolor }) => hexcolor,
    margin: '0 5px',
  },
  details: {
    display: 'flex',
    margin: '0 0 0 15px',
  },
  icon: {
    width: '30px',
  },
}));

const Leg = ({ origin, destination, destDate, origDate, bikeflag, line }) => {
  const classes = useStyles(line);

  return (
    <div className={classes.root}>
      <div className={classes.color} />
      <div>
        <Typography variant="body1">
          <Typography variant="h6" component="span">
            {getFormattedTime(origDate)}
          </Typography>{' '}
          {getTimeMeridian(origDate)}
          {' - '}
          {origin?.name}
        </Typography>
        <div className={classes.details}>
          <div className={classes.icon}>
            <DirectionsBikeIcon fontSize="small" />
          </div>
          <Typography variant="body2">
            Bicycle {bikeflag === '1' ? '' : 'not '} allowed
          </Typography>
        </div>
        <div className={classes.details}>
          <div className={classes.icon}>
            <TrendingFlatIcon fontSize="small" />
          </div>
          <Typography variant="body2">{line?.name}</Typography>
        </div>
        <div className={classes.details}>
          <div className={classes.icon}>
            <ScheduleIcon fontSize="small" />
          </div>
          <Typography variant="body2">
            {getFormattedTimeDifference(origDate, destDate)} min
          </Typography>
        </div>
        <Typography variant="body1">
          <Typography variant="h6" component="span">
            {getFormattedTime(destDate)}
          </Typography>{' '}
          {getTimeMeridian(destDate)}
          {' - '}
          {destination?.name}
        </Typography>
      </div>
    </div>
  );
};

Leg.propTypes = {};

export { Leg };
