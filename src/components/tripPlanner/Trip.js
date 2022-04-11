import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Leg from './Leg';

const Trip = ({
  origin,
  destination,
  fare,
  // fares,
  leg,
  origTimeMin,
  // origTimeDate,
  destTimeMin,
  // destTimeDate,
}) => {
  const legChildren = useMemo(() => {
    return leg.map((prop, index) => {
      // Logger.info('leg::props', prop);
      return <Leg key={index} {...prop} />;
    });
  }, [leg]);

  return (
    <div className="flex flex-col p-2 border rounded border-slate-400">
      <div className="flex justify-between text-xl">
        <span>{origTimeMin}</span>
        <span>{destTimeMin}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{origin.name}</span>
        <span>{destination.name}</span>
      </div>
      <div className="text-sm">fare: ${fare}</div>
      <div className="space-y-2">{legChildren}</div>
    </div>
  );
};
Trip.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  fare: PropTypes.string,
  leg: PropTypes.array,
  origTimeMin: PropTypes.string,
  destTimeMin: PropTypes.string,
};

export default memo(Trip);
