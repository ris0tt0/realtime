import {
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import Logger from 'js-logger';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTripPlanning } from '../actions';
import { Itinerary } from '../components/tripPlanner/itinerary';
import {
  getStations,
  getTripPlanningIsRequestingSelector,
  getTripPlanningErrorSelector,
  getTripPlanningCurrentResultSelector,
} from '../selectors';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  station: {
    display: 'flex',
    flexDirection: 'row',
  },
  trip: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const getStationNameCreator = (stations) => (id) =>
  stations.find((station) => station.abbr === id).name;

const TripPlanner = () => {
  const dispatch = useDispatch();
  const stations = useSelector(getStations);
  const isRequesting = useSelector(getTripPlanningIsRequestingSelector);
  const error = useSelector(getTripPlanningErrorSelector);
  const data = useSelector(getTripPlanningCurrentResultSelector);
  const classes = useStyles();

  Logger.info(data);

  const [searchDisabled, setSearchDisabled] = useState(true);
  const [isOrigin, setIsOrigin] = useState(false);
  const [originId, setOriginId] = useState('origin');
  const [destinationId, setDestinationId] = useState('destination');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getName = getStationNameCreator(stations);

  const handleDateChange = (date) => setSelectedDate(date);

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
      isRequesting ||
        !(
          originId !== 'origin' &&
          destinationId !== 'destination' &&
          originId !== destinationId
        )
    );
  }, [originId, destinationId, isRequesting]);

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
      <div className={classes.station}>
        <Typography variant="h5">A</Typography>
        <Button
          disabled={isRequesting}
          aria-controls="origin-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={handleOriginClick}
        >
          {originId === 'origin' ? 'origin' : getName(originId)}
        </Button>
      </div>
      <div className={classes.station}>
        <Typography variant="h5">B</Typography>
        <Button
          disabled={isRequesting}
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
      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
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
      <Itinerary
        origin={data?.origin}
        destination={data?.destination}
        date={data?.schedule?.date}
        trips={data?.schedule?.request?.trip}
      />
    </Container>
  );
};

export { TripPlanner };
