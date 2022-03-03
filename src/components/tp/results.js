import Logger from 'js-logger';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTripScheduleSelector } from '../../selectors/schedule';

const TripPlannerResults = () => {
  const data = useSelector(getTripScheduleSelector);

  Logger.info('TripPlannerResults::', data);
  return (
    <div className="flex w-full h-full border border-teal-500 rounded">
      TripPlannerResults
    </div>
  );
};

export default TripPlannerResults;
