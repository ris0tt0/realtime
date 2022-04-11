import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Leg = ({
  // bikeflag,
  destTimeMin,
  // destTimeDate,
  destination,
  line,
  // load,
  origTimeMin,
  // origTimeDate,
  origin,
  // trainHeadStation,
}) => {
  return (
    <div className="flex flex-col p-2 border rounded border-slate-400">
      <div className="flex flex-col justify-between text-sm">
        <div className="space-x-5">
          <span className="text-xl">{origTimeMin.toLowerCase()}</span>
          <span>{origin.name}</span>
        </div>
        <div className="ml-5 text-xs">{line.name}</div>
        <div className="space-x-5">
          <span className="text-xl">{destTimeMin.toLowerCase()}</span>
          <span>{destination.name}</span>
        </div>
      </div>
    </div>
  );
};
Leg.propTypes = {
  destTimeMin: PropTypes.string,
  destination: PropTypes.object,
  line: PropTypes.object,
  origTimeMin: PropTypes.string,
  origin: PropTypes.object,
};

export default memo(Leg);
