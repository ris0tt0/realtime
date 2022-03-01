import Logger from 'js-logger';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDeparturesListSelector } from '../../selectors/rtd';

const getMinutes = (minutes) => {
  if (minutes.toLowerCase() === 'leaving') {
    return minutes;
  }
  return `${minutes} min`;
};

const ETDList = ({ name, children }) => {
  return (
    <div>
      <div className="text-2xl">{name}</div>
      <div className="p-2 m-2 border divide-y rounded divide-slate-600 border-slate-400">
        {children}
      </div>
    </div>
  );
};

const ETDLine = ({ destination, children }) => {
  return (
    <div className="flex justify-between">
      <div className="text-xl">{destination}</div>
      <div className="flex space-x-2">{children}</div>
    </div>
  );
};

const Estimate = ({
  bikeflag,
  color,
  delay,
  direction,
  hexcolor,
  length,
  minutes,
  platform,
}) => {
  const bikeFlagIcon = bikeflag ? <div>bF</div> : null;
  return (
    <div className="flex items-baseline space-x-1">
      <span className="text-xl">{getMinutes(minutes)}</span>
      <span className="text-xs">({length} car)</span>
    </div>
  );
};

const RealTimeDeparturesResult = () => {
  const [rtd, setRtd] = useState({ name: '' });
  const results = useSelector(realTimeDeparturesListSelector);

  useEffect(() => {
    if (results[0] && results[0].name) {
      setRtd({ name: results[0].name, etd: results[0].etd });
    }
  }, [results]);

  const stationResults = useMemo(() => {
    const etdChildren = rtd.etd?.map((item, index) => {
      const estChildren = item.estimate?.map((estimate, index) => {
        return <Estimate key={`${estimate.minutes} ${index} `} {...estimate} />;
      });

      return (
        <ETDLine
          key={`${item.destination} ${index}`}
          destination={item.destination}
        >
          {estChildren}
        </ETDLine>
      );
    });

    return <ETDList name={rtd.name}>{etdChildren}</ETDList>;
  }, [rtd]);

  return (
    <div className="w-full h-full">{stationResults ?? <div>error</div>}</div>
  );
};

export default RealTimeDeparturesResult;
