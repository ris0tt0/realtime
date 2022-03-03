import Logger from 'js-logger';
import React from 'react';
import TripPlannerResults from '../components/tp/results';
import StationsList from '../components/tp/stationsList';

const TripPlanner = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <StationsList />
      <TripPlannerResults />
    </div>
  );
};

export default TripPlanner;
