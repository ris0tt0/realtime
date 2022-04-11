import React from 'react';
import StationsList from '../containers/tp/list';
import TripPlannerResults from '../containers/tp/results';

const TripPlanner = () => {
  return (
    <div className="flex flex-col w-full h-full p-2 m-2">
      <StationsList />
      <TripPlannerResults />
    </div>
  );
};

export default TripPlanner;
