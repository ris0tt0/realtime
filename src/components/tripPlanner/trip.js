import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { getFormattedTime, getTimeMeridian } from '../../utils/date';
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTimeTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logger from 'js-logger';
import Leg from './leg';
import Transfer from './transfer';
import { ItineraryBar } from './common';

const useStyles = makeStyles({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  time: {
    minWidth: '180px',
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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div className={classes.header}>
          <div className={classes.time}>
            <Typography variant="h5">
              {getFormattedTime(origDate)}{' '}
              <Typography variant="subtitle2" component="span">
                {getTimeMeridian(origDate)}
              </Typography>{' '}
              - {getFormattedTime(destDate)}{' '}
              <Typography variant="subtitle2" component="span">
                {getTimeMeridian(destDate)}
              </Typography>
            </Typography>
          </div>
          <ItineraryBar leg={leg} />
          <div>
            <div className={classes.details}>
              <AccessTimeTwoToneIcon fontSize="small" />
              <Typography variant="caption">{tripTime}</Typography>
            </div>
            <div className={classes.details}>
              <AttachMoneyTwoToneIcon fontSize="small" />
              <Typography variant="caption">{fare}</Typography>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.leg}>
          {leg.reduce((legs, leg, index, list) => {
            legs.push(<Leg key={`leg_${index}`} {...leg} />);
            if (list[index + 1]) {
              legs.push(
                <Transfer
                  key={`xfer_${index}`}
                  trainHeaded={list[index + 1].trainHeadStation}
                  origDate={leg.destDate}
                  destDate={list[index + 1].origDate}
                />
              );
            }
            return legs;
          }, [])}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

Trip.propTypes = {};

export default Trip;
