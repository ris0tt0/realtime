import React from 'react';
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { requestRealTimeEstimates } from '../actions';
import { getStations } from '../selectors';

function RealTimeDepartures(props) {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    </Container>
  );
}

RealTimeDepartures.propTypes = {};

export { RealTimeDepartures };
