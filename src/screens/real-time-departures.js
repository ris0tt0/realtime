import {
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Logger from 'js-logger';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestRealTimeEstimates } from '../actions';
import {
  getRealTimeEstimatesResultMapSelector,
  getStations,
} from '../selectors';

function RealTimeDepartures(props) {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const platformMap = useSelector(getRealTimeEstimatesResultMapSelector);
  const [anchorEl, setAnchorEl] = useState(null);

  Logger.info(platformMap);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (stationId) => {
    dispatch(requestRealTimeEstimates(stationId));
    setAnchorEl(null);
  };

  const data = Array.from(platformMap).map(([platformName, destinationMap]) => {
    return (
      <div>
        <Typography variant="body1">{platformName}</Typography>
        <div>
          {Array.from(destinationMap).map(([_, { destination, estimate }]) => {
            return (
              <div>
                <Typography variant="body2">{destination.name}</Typography>
                <div>
                  {estimate.map((item) => (
                    <div>{item.minutes}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <Container>
      <Typography variant="h2">Real Time Departures</Typography>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Select Station
      </Button>
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
      {data}
    </Container>
  );
}

RealTimeDepartures.propTypes = {};

export { RealTimeDepartures };
