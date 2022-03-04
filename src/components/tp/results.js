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
      // Logger.info('useTripProps', list, stationMap);
      propsRef.current = data;
      setProps(data);
    }
  }, [list, stationMap]);

  return props;
};

const Leg = ({
  bikeflag,
  destTimeMin,
  destTimeDate,
  destination,
  line,
  load,
  origTimeMin,
  origTimeDate,
  origin,
  trainHeadStation,
}) => {
  // Logger.info(
  //   'leg::',
  //   bikeflag,
  //   destTimeMin,
  //   destTimeDate,
  //   destination,
  //   line,
  //   load,
  //   origTimeMin,
  //   origTimeDate,
  //   origin,
  //   trainHeadStation
  // );
  return (
    <div className="flex flex-col p-1 m-1 border rounded border-slate-400">
      <div className="flex justify-between text-xl">
        <span>{origTimeMin}</span>
        <span>{destTimeMin}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{origin.name}</span>
        <span>{destination.name}</span>
      </div>
    </div>
  );
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
  const legChildren = useMemo(() => {
    return leg.map((prop, index) => {
      return <Leg key={index} {...prop} />;
    });
  }, [leg]);

  return (
    <div className="flex flex-col p-1 m-1 border rounded border-slate-400">
      <div className="flex justify-between text-xl">
        <span>{origTimeMin}</span>
        <span>{destTimeMin}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{origin.name}</span>
        <span>{destination.name}</span>
      </div>
      <div className="text-sm">fare: ${fare}</div>
      {legChildren}
    </div>
  );
};

const TripPlannerResults = () => {
  const tripProps = useTripProps();

  const trips = useMemo(() => {
    return tripProps.map((props, index) => {
      return <Trip key={index} {...props} />;
    });
  }, [tripProps]);

  return (
    <div className="w-full h-full overflow-scroll border border-teal-500 rounded">
      {trips}
    </div>
  );
};

export default TripPlannerResults;
