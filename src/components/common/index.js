import PropTypes from 'prop-types';
import React from 'react';
export function StationItem({ destination, estimate }) {
  const times = estimate.map(({ minutes, length }, index, list) => {
    let time =
      minutes === 'Leaving'
        ? `${minutes} (${length} car)`
        : `${minutes} min (${length} car)`;

    if (index < list.length - 1) time += ', ';

    return <span key={index}>{time}</span>;
  });

  return (
    <div className="stationitem">
      <div className="stationitem__color"></div>
      <span className="stationitem__destination">{destination}</span>
      <span className="stationitem__times">{times}</span>
    </div>
  );
}

StationItem.propTypes = {
  destination: PropTypes.string.isRequired,
  estimate: PropTypes.arrayOf(
    PropTypes.shape({
      bikeflag: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      delay: PropTypes.string.isRequired,
      direction: PropTypes.string.isRequired,
      hexcolor: PropTypes.string.isRequired,
      length: PropTypes.string.isRequired,
      minutes: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
