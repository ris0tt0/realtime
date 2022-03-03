import Logger from 'js-logger';
import { isEqual } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTripListSelector } from '../../selectors/schedule';
import { getStationsMapSelector } from '../../selectors/station';

const useTripProps = () => {
  const list = useSelector(getTripListSelector);
  const stationMap = useSelector(getStationsMapSelector);
  const propsRef = useRef([]);
  const [props, setProps] = useState([]);

  useEffect(() => {
    const data = list.map((trip) => {
      const origin = stationMap.get(trip.origin);
      const destination = stationMap.get(trip.destination);
      const leg = trip.leg.map((leg) => {
        const origin = stationMap.get(leg.origin);
        const destination = stationMap.get(leg.destination);
        return { ...leg, origin, destination };
      });

      return { ...trip, leg, origin, destination };
    });

    if (!isEqual(data, propsRef.current)) {
      Logger.info('useTripProps', list, stationMap);
      propsRef.current = data;
      setProps(data);
    }
  }, [list, stationMap]);

  return props;
};

const Trip = ({
  origin,
  destination,
  fare,
  fares,
  leg,
  origTimeMin,
  origTimeDate,
  destTimeMin,
  destTimeDate,
}) => {
  return (
    <div>
      <div>
        <span>{origin.name}</span>><span>{destination.name}</span>
      </div>
      <div>
        <span className="flex items-baseline text-lg">
          {origTimeMin} <span className="text-sm">{origTimeDate}</span>
        </span>
      </div>
      <div className="text-sm">fare:{fare}</div>
    </div>
  );
};

const TripPlannerResults = () => {
  const tripProps = useTripProps();

  const trips = useMemo(() => {
    return tripProps.map((props, index) => {
      Logger.info('trips::props', props);
      return <Trip key={index} {...props} />;
    });
  }, [tripProps]);

  return (
    <div className="flex flex-col w-full h-full border border-teal-500 rounded">
      {trips}
    </div>
  );
};

export default TripPlannerResults;
