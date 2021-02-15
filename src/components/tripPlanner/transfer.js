import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { getFormattedTimeDifference } from '../../utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  color: {
    width: '10px',
    backgroundColor: 'lightgray',
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

const Transfer = ({ origDate, destDate, trainHeaded }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.color} />
      <div>
        <Typography variant="body2">Transfer: {trainHeaded}</Typography>
        <div className={classes.details}>
          <div className={classes.icon}>
            <ScheduleIcon fontSize="small" />
          </div>
          <Typography variant="body2">
            {getFormattedTimeDifference(origDate, destDate)} min
          </Typography>
        </div>
      </div>
    </div>
  );
};

Transfer.propTypes = {};

export default Transfer;
