import {
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import Logger from 'js-logger';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestRealTimeEstimates } from '../actions';
import {
  getRealTimeEstimatesResultDateSelector,
  getRealTimeEstimatesResultMapSelector,
  getStations,
} from '../selectors';

const useStyles = makeStyles({
  details: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  station: {
    display: 'flex',
  },
  platform: {
    margin: '10px 0',
  },
  destinations: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  destination: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    display: 'flex',
    padding: '0 10px',
  },
  estimates: {
    display: 'flex',
  },
  minutes: {
    padding: '0 5px',
  },
});

const Platforms = ({ platformMap }) => {
  const classes = useStyles();
  return Array.from(platformMap).map(
    ([platformName, destinationMap], index) => (
      <Paper key={`-p${index}`} className={classes.platform}>
        <Typography variant="h6">Platform {platformName}</Typography>
        <div className={classes.destinations}>
          {Array.from(destinationMap).map(
            ([_, { destination, estimate }], index) => {
              return (
                <div key={`-${index}`} className={classes.destination}>
                  <div>
                    <Typography variant="h5">{destination.name}</Typography>
                  </div>
                  <div className={classes.estimates}>
                    {estimate.map((item) => (
                      <Typography className={classes.minutes} variant="h4">
                        {item.minutes}
                      </Typography>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Paper>
    )
  );
};
function RealTimeDepartures(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const platformMap = useSelector(getRealTimeEstimatesResultMapSelector);
  const date = useSelector(getRealTimeEstimatesResultDateSelector);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (stationId) => {
    dispatch(requestRealTimeEstimates(stationId));
    setAnchorEl(null);
  };
  return (
    <Container>
      <Typography variant="h2">Real Time Departures</Typography>
      <div className={classes.details}>
        <div className={classes.station}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Select Station
          </Button>
          <Typography variant="h4">Station Name</Typography>
        </div>
        <Typography variant="caption">34:34am</Typography>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {stations.map((station, index) => (
          <MenuItem
            key={`${station.id}-${index}`}
            onClick={() => handleClose(station.id)}
          >
            {station.name}
          </MenuItem>
        ))}
      </Menu>
      <Platforms platformMap={platformMap} />
    </Container>
  );
}

RealTimeDepartures.propTypes = {};

export { RealTimeDepartures };
