import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTime';
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoney';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { TimeStandard } from '../common';
import { ItineraryBar } from './common';
import { Leg } from './leg';
import Transfer from './transfer';

const useStyles = makeStyles({
  root: {},
  header: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  time: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
  },
  detailss: {
    display: 'flex',
    justifyContent: 'center',
  },
  detail: {
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
            <TimeStandard date={origDate} />
            <ItineraryBar leg={leg} />
            <TimeStandard date={destDate} />
          </div>
          <div className={classes.details}>
            <div className={classes.detailss}>
              <div className={classes.detail}>
                <AccessTimeTwoToneIcon fontSize="small" />
                <Typography variant="body2">{tripTime} min</Typography>
              </div>
              <div className={classes.detail}>
                <AttachMoneyTwoToneIcon fontSize="small" />
                <Typography variant="body2">{fare}</Typography>
              </div>
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

export default Trip;
