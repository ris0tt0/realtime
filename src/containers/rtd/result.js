import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { realTimeDeparturesListSelector } from '../../selectors/RealTimeDepartures';

const getMinutes = (minutes) => {
  if (minutes.toLowerCase() === 'leaving') {
    return minutes;
  }
  return `${minutes} min`;
};

const ETDPlatform = ({ platform, children }) => {
  return (
    <div className="p-2">
      <div className="font-semibold">Platform: {platform}</div>
      <div className="px-2 border divide-y rounded divide-slate-600 border-slate-600">
        {children}
      </div>
    </div>
  );
};

ETDPlatform.propTypes = {
  platform: PropTypes.string,
  children: PropTypes.array,
};

const ETDList = ({ name, children }) => {
  return (
    <div>
      <div className="text-2xl">{name}</div>
      <div className="p-2 m-2 border divide-y rounded divide-slate-600 border-slate-600">
        {children}
      </div>
    </div>
  );
};

ETDList.propTypes = {
  name: PropTypes.string,
  children: PropTypes.array,
};

const ETDLine = ({ destination, children }) => {
  return (
    <div className="flex justify-between">
      <div className="">{destination}</div>
      <div className="flex space-x-2">{children}</div>
    </div>
  );
};

ETDLine.propTypes = {
  destination: PropTypes.string,
  children: PropTypes.array,
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
  const bikeFlagIcon = bikeflag == '1' ? <div>bF</div> : null;

  return (
    <div className="flex items-baseline space-x-1">
      <span className="">{getMinutes(minutes)}</span>
      <span className="text-xs text-text-secondary">({length} car)</span>
    </div>
  );
};

const estimateStation = (item, index) => {
  const estChildren = item.estimate?.map((estimate, index) => {
    return <Estimate key={`${estimate.minutes} ${index}`} {...estimate} />;
  });

  return (
    <ETDLine
      key={`${item.destination} ${index}`}
      destination={item.destination}
    >
      {estChildren}
    </ETDLine>
  );
};
/**
bikeflag: "1"
color: "YELLOW"
delay: "541"
direction: "North"
hexcolor: "#ffff33"
length: "10"
minutes: "Leaving"
platform: "3"
*/
Estimate.propTypes = {
  bikeflag: PropTypes.string,
  color: PropTypes.string,
  delay: PropTypes.string,
  direction: PropTypes.string,
  hexcolor: PropTypes.string,
  length: PropTypes.string,
  minutes: PropTypes.string,
  platform: PropTypes.string,
};

const RealTimeDeparturesResult = () => {
  const [rtd, setRtd] = useState({ name: '' });
  const results = useSelector(realTimeDeparturesListSelector);

  useEffect(() => {
    if (results[0] && results[0].name) {
      setRtd({ name: results[0].name, etd: results[0].etd });
    }
  }, [results]);

  const stationListResults = useMemo(() => {
    const etdChildren = rtd.etd?.map((item, index) =>
      estimateStation(item, index)
    );

    return <ETDList name={rtd.name}>{etdChildren}</ETDList>;
  }, [rtd]);

  const stationPlatformResults = useMemo(() => {
    const platforms = rtd.etd?.reduce((platform, station, index) => {
      station.estimate.forEach((est) => {
        if (!platform.has(est.platform)) {
          platform.set(est.platform, new Map());
        }
        if (
          !platform
            .get(est.platform)
            .has(station.destination + station.abbreviation)
        ) {
          platform
            .get(est.platform)
            .set(station.destination + station.abbreviation, {
              abbreviation: station.abbreviation,
              destination: station.destination,
              estimate: [],
            });
        }
        platform
          .get(est.platform)
          .get(station.destination + station.abbreviation)
          .estimate.push(est);
      });
      return platform;
    }, new Map());

    if (platforms) {
      return [...platforms.entries()].map(([platform, stations], index) => {
        const stationChild = [...stations.values()].map((item, index) =>
          estimateStation(item, index)
        );

        return (
          <ETDPlatform key={`${platform} ${index}`} platform={platform}>
            {stationChild}
          </ETDPlatform>
        );
      });
    }
    return null;
  }, [rtd]);

  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <>{stationListResults ?? <div>error</div>}</>
      <>{stationPlatformResults ?? <div>error</div>}</>
    </div>
  );
};

export default RealTimeDeparturesResult;
