import React from 'react';
import TripPlannerResults from '../containers/tripPlanner/results';
import StationsList from '../containers/tripPlanner/stationsList';

const TripPlanner = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <StationsList />
      <TripPlannerResults />
    </div>
  );
};

export default TripPlanner;
