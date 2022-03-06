import Logger from 'js-logger';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRouteInfoSelector } from '../../selectors/Route';
import { getStationsMapSelector } from '../../selectors/Station';

const useRouteInfoProps = () => {
  const routeInfo = useSelector(getRouteInfoSelector);
  const stationMap = useSelector(getStationsMapSelector);
  const routeInfoRef = useRef({});
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const config = routeInfo.config.map((id) => stationMap.get(id));
    const data = { ...routeInfo, config };

    if (!isEqual(data, routeInfoRef.current)) {
      routeInfoRef.current = data;
      setInfo(data);
    }
  }, [routeInfo]);

  return info;
};

const Config = ({ stations }) => {
  const list = stations.map((station, index) => {
    return <div key={index}>{station.name}</div>;
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
    <div>
      <div>
        {routeInfo.name} - {routeInfo.routeID.toLowerCase()}
      </div>
      <div className="text-xs">
        <Config stations={routeInfo.config} />
      </div>
    </div>
  );
};

export default Results;
