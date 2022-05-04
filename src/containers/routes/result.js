import Logger from 'js-logger';
import PropTypes from 'prop-types';
import React from 'react';
import { useRouteInfoProps } from './hooks';

const Config = ({ stations }) => {
  const list = stations.map((station, index) => {
    return <div key={index}>{station?.name}</div>;
  });
  return <div>{list}</div>;
};

Config.propTypes = {
  stations: PropTypes.array,
};

const Results = () => {
  const routeInfo = useRouteInfoProps();

  Logger.info('routeinfo::', routeInfo);
  if (routeInfo === null) return null;
  return (
    <div className="mx-2">
      <div className="text-lg">
        {routeInfo?.name} - {routeInfo?.routeID}
      </div>
      <div className="text-xs">
        <Config stations={routeInfo?.config} />
      </div>
    </div>
  );
};

export default Results;
