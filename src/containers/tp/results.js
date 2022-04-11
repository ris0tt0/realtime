import React, { useMemo } from 'react';
import Trip from '../../components/tripPlanner/Trip';
import { useTripProps } from './hooks';

const TripPlannerResults = () => {
  const tripProps = useTripProps();

  const trips = useMemo(() => {
    return tripProps.map((props, index) => {
      return <Trip key={index} {...props} />;
    });
  }, [tripProps]);

  return (
    <div className="flex flex-col w-full h-full space-y-2 overflow-scroll">
      {trips}
    </div>
  );
};

export default TripPlannerResults;
