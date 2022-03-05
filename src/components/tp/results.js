import React, { useMemo } from 'react';
import { useTripProps } from './hooks';

const Time = ({ min }) => {
  return <>{min.toLowerCase()}</>;
};

const Leg = ({
  bikeflag,
  destTimeMin,
  destTimeDate,
  destination,
  line,
  load,
  origTimeMin,
  origTimeDate,
  origin,
  trainHeadStation,
}) => {
  return (
    <div className="flex flex-col p-1 m-1 border rounded border-slate-400">
      <div className="flex flex-col justify-between text-sm">
        <div className="space-x-5">
          <span className="text-xl">
            <Time min={origTimeMin} />
          </span>
          <span>{origin.name}</span>
        </div>
        <div className="ml-5 text-xs">{line.name}</div>
        <div className="space-x-5">
          <span className="text-xl">
            <Time min={destTimeMin} />
          </span>
          <span>{destination.name}</span>
        </div>
      </div>
    </div>
  );
};

const Trip = ({
  origin,
  destination,
  fare,
  fares,
  leg,
  origTimeMin,
  origTimeDate,
  destTimeMin,
  destTimeDate,
}) => {
  const legChildren = useMemo(() => {
    return leg.map((prop, index) => {
      // Logger.info('leg::props', prop);
      return <Leg key={index} {...prop} />;
    });
  }, [leg]);

  return (
    <div className="flex flex-col p-1 m-1 border rounded border-slate-400">
      <div className="flex justify-between text-xl">
        <span>{origTimeMin}</span>
        <span>{destTimeMin}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{origin.name}</span>
        <span>{destination.name}</span>
      </div>
      <div className="text-sm">fare: ${fare}</div>
      {legChildren}
    </div>
  );
};

const TripPlannerResults = () => {
  const tripProps = useTripProps();

  const trips = useMemo(() => {
    return tripProps.map((props, index) => {
      return <Trip key={index} {...props} />;
    });
  }, [tripProps]);

  return (
    <div className="w-full h-full overflow-scroll border border-teal-500 rounded">
      {trips}
    </div>
  );
};

export default TripPlannerResults;
