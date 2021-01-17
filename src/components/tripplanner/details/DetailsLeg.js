import PropTypes from 'prop-types';
import React from 'react';

const DetailsLeg = ({ data }) => {
  return (
    <div className="detailsleg">
      <span className="detailsleg__time">{data['@origTimeMin']}</span>
      <span className="detailsleg__name">{data.origin.name}</span>
      <div style={{ backgroundColor: data.line.color }}>
        <span className="detailsleg__line">{data.line.name}</span>
      </div>
      <span className="detailsleg__time">{data['@destTimeMin']}</span>{' '}
      <span className="detailsleg__name">{data.destination.name}</span>
    </div>
  );
};

DetailsLeg.propTypes = {
  data: PropTypes.shape({
    '@bikeflag': PropTypes.string.isRequired,
    '@destTimeDate': PropTypes.string.isRequired,
    '@destTimeMin': PropTypes.string.isRequired,
    '@destination': PropTypes.string.isRequired,
    '@line': PropTypes.string.isRequired,
    '@load': PropTypes.string.isRequired,
    '@order': PropTypes.string.isRequired,
    '@origTimeDate': PropTypes.string.isRequired,
    '@origTimeMin': PropTypes.string.isRequired,
    '@origin': PropTypes.string.isRequired,
    '@trainHeadStation': PropTypes.string.isRequired,
    destination: PropTypes.shape({
      abbr: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      gtfs_latitude: PropTypes.string.isRequired,
      gtfs_longitude: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
    origin: PropTypes.shape({
      abbr: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      county: PropTypes.string.isRequired,
      gtfs_latitude: PropTypes.string.isRequired,
      gtfs_longitude: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
    line: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export { DetailsLeg };
