import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationsParams } from '..';
import { BartStationDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { Loading } from '../styled/loading';

export const StationDetail: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();
  const [dataLoading, setDataLoading] = useState(false);
  const [stationData, setStationData] = useState<BartStationDetail | null>(
    null,
  );

  useEffect(() => {
    if (stationId) {
      setDataLoading(true);
      commands
        .getStationDetails(stationId)
        .then((data) => {
          setStationData(data ?? null);
        })
        .finally(() => setDataLoading(false));
    }
  }, [stationId]);

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Station Detail {stationId}</h1>
      <div>Station Detail:{stationData?.name}</div>
    </div>
  );
};
