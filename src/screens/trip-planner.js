import {
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTripPlanning } from '../actions';
import { getStations } from '../selectors';

const getStationNameCreator = (stations) => (id) =>
  stations.find((station) => station.abbr === id).name;

const TripPlanner = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const getName = getStationNameCreator(stations);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [isOrigin, setIsOrigin] = useState(false);
  const [originButtonName, setOriginButtonName] = useState('origin');
  const [destinationButtonName, setDestinationButtonName] = useState(
    'destination'
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (id) => {
    isOrigin ? setOriginButtonName(id) : setDestinationButtonName(id);
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
    dispatch(
      requestTripPlanning(originButtonName, destinationButtonName, 'now')
    );

  useEffect(() => {
    setSearchDisabled(
      !(
        originButtonName !== 'origin' &&
        destinationButtonName !== 'destination' &&
        originButtonName !== destinationButtonName
      )
    );
  }, [originButtonName, destinationButtonName]);

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
          {originButtonName === 'origin' ? 'origin' : getName(originButtonName)}
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
          {destinationButtonName === 'destination'
            ? 'destintation'
            : getName(destinationButtonName)}
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
