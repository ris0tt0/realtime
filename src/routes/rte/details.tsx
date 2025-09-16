import Logger from 'js-logger';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationsParams } from '..';
import { useCommands } from '../../hooks/useCommands';
import { useRte } from '../../hooks/useRte';
import { RTEStationDetail } from './stationDetails';

export const RTEDetail: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();
  const [loading, setLoading] = useState(true);
  const rte = useRte(stationId);

  useEffect(() => {
    if (stationId) {
      setLoading(true);
      commands
        .udpateStationRealTimeEstimates(stationId)
        .then((data) => {})
        .finally(() => setLoading(false));
    }
  }, [stationId]);

  if (!rte) {
    return null;
  }

  if (loading) {
    return <div>loading</div>;
  }

  return <RTEStationDetail rte={rte} />;
};
