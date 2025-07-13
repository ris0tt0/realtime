import React, { FC } from 'react';
import { useRTEDetail } from '../../hooks/useRealTimeEstimateDetails';
import { RTEStationDetail } from './stationDetails';

export const RTEDetail: FC = () => {
  const data = useRTEDetail();

  if (data === null) {
    return null;
  }

  const result =
    data.map((station) => {
      return <RTEStationDetail key={station.abbr} station={station} />;
    }) ?? null;

  return <>{result}</>;
};
