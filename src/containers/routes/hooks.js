import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getRouteInfoSelector,
  getRoutesMapSelector,
} from '../../selectors/route';
import { getStationsMapSelector } from '../../selectors/station';

export const useRouteResultProps = () => {
  const routesMap = useSelector(getRoutesMapSelector);
  const routeInfo = useSelector(getRouteInfoSelector);

  if (routeInfo?.routeID) {
    const route = routesMap.get(routeInfo.routeID);
    return route;
  }
  return null;
};

export const useRouteInfoProps = () => {
  const routeInfo = useSelector(getRouteInfoSelector);
  const stationMap = useSelector(getStationsMapSelector);
  const routeInfoRef = useRef({});
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (routeInfo.config) {
      const config = routeInfo.config?.map((id) => stationMap.get(id));
      const data = { ...routeInfo, config };

      if (!isEqual(data, routeInfoRef.current)) {
        routeInfoRef.current = data;
        setInfo(data);
      }
    }
  }, [routeInfo, stationMap]);

  return info;
};
