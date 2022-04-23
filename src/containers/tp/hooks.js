import Logger from 'js-logger';
import { isEqual, result } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRoutesMapSelector } from '../../selectors/route';
import {
  getTripListSelector,
  getTripScheduleSelector,
} from '../../selectors/schedule';
import { getStationsMapSelector } from '../../selectors/station';

/**
 * This hook returns the current trip list results
 * @returns a tuple where the index 0 is the origin, and 1 is the destination
 */
export const useTripListProps = () => {
  const [props, setProps] = useState([]);
  const propsRef = useRef([]);

  const results = useSelector(getTripScheduleSelector);
  const stationMap = useSelector(getStationsMapSelector);

  useEffect(() => {
    const origin = stationMap?.get(results.origin) ?? null;
    const destination = stationMap?.get(results.destination) ?? null;

    if (!isEqual(propsRef.current, [origin, destination])) {
      setProps([origin, destination]);
    }
  }, [results, stationMap]);

  return props;
};
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
