import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { useRTE, useSetRTE } from '../../hooks/useRealTimeEstimates';
import { RTEStationDetail } from './stationDetails';
import { StationsParams } from '..';

const useRequestBartRealTimeEstimates = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();

  useEffect(() => {
    if (stationId) {
      commands.udpateStationRealTimeEstimates(stationId).then((data) => {});
    }
  }, [stationId]);
};

export const RTEDetail: FC = () => {
  const setRTE = useSetRTE();
  useRequestBartRealTimeEstimates();

  useEffect(() => () => setRTE(null), []);

  const data = useRTE();

  if (data === null) {
    return null;
  }

  const result =
    data.map((station) => {
      return <RTEStationDetail key={station.abbr} station={station} />;
    }) ?? null;

  return <>{result}</>;
};
