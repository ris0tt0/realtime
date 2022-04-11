import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRoutesMapSelector } from '../../selectors/Route';
import { getTripListSelector } from '../../selectors/Schedule';
import { getStationsMapSelector } from '../../selectors/Station';

/**
 * Props data for the trip planner component.
 * @returns prop data for trip props list
 */
export const useTripProps = () => {
  const list = useSelector(getTripListSelector);
  const stationMap = useSelector(getStationsMapSelector);
  const routesMap = useSelector(getRoutesMapSelector);
  const propsRef = useRef([]);
  const [props, setProps] = useState([]);

  useEffect(() => {
    const data = list.map((trip) => {
      const origin = stationMap.get(trip.origin);
      const destination = stationMap.get(trip.destination);
      const leg = trip.leg.map((leg) => {
        const origin = stationMap.get(leg.origin);
        const destination = stationMap.get(leg.destination);
        const line = routesMap.get(leg.line);
        return { ...leg, origin, destination, line };
      });

      return { ...trip, leg, origin, destination };
    });

    if (!isEqual(data, propsRef.current)) {
      // Logger.info('useTripProps', list, stationMap);
      propsRef.current = data;
      setProps(data);
    }
  }, [list, stationMap]);

  return props;
};
