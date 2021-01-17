import PropTypes from 'prop-types';
import React from 'react';

export function Sort({ time, stationName, onClick }) {
  return (
    <div className="realtimedepartures__sort">
      <div className="realtimedepartures__sort__header">
        <div className="realtimedepartures__sort__headerName">
          <b>{stationName}</b>
        </div>
        <div className="realtimedepartures__sort__headerTime">
          Updated: {time}
        </div>
      </div>
      <div className="realtimedepartures__sort__control">
        <span>Sort by: </span>
        <a
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            onClick('name');
          }}
        >
          Name
        </a>{' '}
        |{' '}
        <a
          href="#"
          key="platfrom"
          onClick={(e) => {
            e.stopPropagation();
            onClick('platform');
          }}
        >
          Platform
        </a>
      </div>
    </div>
  );
}

Sort.propTypes = {
  time: PropTypes.string.isRequired,
  stationName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
