import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Logger from 'js-logger';
import { useDispatch, useSelector } from 'react-redux';
import { requestRealTimeEstimates } from '../actions';
import {
  getRealTimeEstimateResultStationSelector,
  getRealTimeEstimatesResultDateSelector,
  getRealTimeEstimatesResultMapSelector,
  getStations,
} from '../selectors';
import { Platforms } from '../components/realTimeDepartures/platforms';
import { getFormattedTime } from '../utils/date';

const useStyles = makeStyles({
  stationInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
function RealTimeDepartures(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const station = useSelector(getRealTimeEstimateResultStationSelector);
  const platformMap = useSelector(getRealTimeEstimatesResultMapSelector);
  const date = useSelector(getRealTimeEstimatesResultDateSelector);

  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonName, setButtonName] = useState('Select Station');
  const [stationAddress, setStationAddress] = useState('');

  useEffect(() => {
    if (station) {
      setButtonName(station.name);
      setStationAddress(
        `${station.address}, ${station.city}, ${station.state}, ${station.zipcode}`
      );
    }
  }, [station]);

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
      <div>
        <Button
          aria-controls="station-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={handleClick}
        >
          {buttonName}
        </Button>
        <div className={classes.stationInfo}>
          <Typography variant="caption">{stationAddress}</Typography>
          <Typography variant="caption">{getFormattedTime(date)}</Typography>
        </div>
      </div>
      <Menu
        id="station-menu"
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
