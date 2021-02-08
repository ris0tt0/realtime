import {
  Button,
  CircularProgress,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Logger from 'js-logger';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTripPlanning } from '../actions';
import {
  getStations,
  getTripPlanningIsRequestingSelector,
  getTripPlanningErrorSelector,
  getTripPlanningCurrentResultSelector,
} from '../selectors';

const getStationNameCreator = (stations) => (id) =>
  stations.find((station) => station.abbr === id).name;

const TripPlanner = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const isRequesting = useSelector(getTripPlanningIsRequestingSelector);
  const error = useSelector(getTripPlanningErrorSelector);
  const data = useSelector(getTripPlanningCurrentResultSelector);

  Logger.info(data);

  const [searchDisabled, setSearchDisabled] = useState(true);
  const [isOrigin, setIsOrigin] = useState(false);
  const [originId, setOriginId] = useState('origin');
  const [destinationId, setDestinationId] = useState('destination');
  const [anchorEl, setAnchorEl] = useState(null);

  const getName = getStationNameCreator(stations);

  const handleMenuClick = (id) => {
    isOrigin ? setOriginId(id) : setDestinationId(id);
    setAnchorEl(null);
  };

  const handleOriginClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOrigin(true);
  };
  const handleDestinationClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOrigin(false);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleOnSearch = () =>
    dispatch(requestTripPlanning(originId, destinationId, 'now'));

  useEffect(() => {
    setSearchDisabled(
      !(
        originId !== 'origin' &&
        destinationId !== 'destination' &&
        originId !== destinationId
      )
    );
  }, [originId, destinationId]);

  if (isRequesting) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Typography>error</Typography>
      </div>
    );
  }

  return (
    <Container>
      <Typography variant="h2">Trip Planning</Typography>
      <div>
        <Typography variant="h5">A</Typography>
        <Button
          aria-controls="origin-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={handleOriginClick}
        >
          {originId === 'origin' ? 'origin' : getName(originId)}
        </Button>
      </div>
      <div>
        <Typography variant="h5">B</Typography>
        <Button
          aria-controls="destination-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={handleDestinationClick}
        >
          {destinationId === 'destination'
            ? 'destination'
            : getName(destinationId)}
        </Button>
      </div>
      <Button
        variant="outlined"
        disabled={searchDisabled}
        onClick={handleOnSearch}
      >
        search
      </Button>
      <Menu
        id="station-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {stations.map((station, index) => (
          <MenuItem
            key={`${station.id}-${index}`}
            onClick={() => handleMenuClick(station.id)}
          >
            {station.name}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export { TripPlanner };
