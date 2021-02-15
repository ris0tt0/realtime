import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import { getFormattedTime, getFormattedTimeDifference } from '../../utils/date';
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
  },
}));

const Leg = ({ origin, destination, destDate, origDate, bikeflag, line }) => {
  const classes = useStyles(line);

  return (
    <div className={classes.root}>
      <div className={classes.color} />
      <div>
        <Typography variant="body1">
          {getFormattedTime(origDate)} {origin?.name}
        </Typography>
        <div className={classes.details}>
          <DirectionsBikeIcon fontSize="small" />
          <Typography variant="body2">
            Bicycle {bikeflag === '1' ? '' : 'not '} allowed
          </Typography>
        </div>
        <div className={classes.details}>
          <TrendingFlatIcon fontSize="small" />
          <Typography variant="body2">{line?.name}</Typography>
        </div>
        <div className={classes.details}>
          <ScheduleIcon fontSize="small" />
          <Typography variant="body2">
            {getFormattedTimeDifference(origDate, destDate)} min
          </Typography>
        </div>
        <Typography variant="body1">
          {getFormattedTime(destDate)} {destination?.name}
        </Typography>
      </div>
    </div>
  );
};

Leg.propTypes = {};

export default Leg;
