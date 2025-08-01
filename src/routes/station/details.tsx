import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationsParams } from '..';
import { BartStationDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { Loading } from '../styled/loading';
import Logger from 'js-logger';
import { styled } from '@mui/material';

const HeaderName = styled('h2')`
  margin-bottom: 0px;
`;

const remoteArtifactors = (intro: string) => {
  const stationMap = intro.replace('Station Map', '');
  const transitStops = stationMap.replace('Transit Stops', '');
  const transitRoutes = transitStops.replace('Transit Routes', '');
  const schedulesAndFares = transitRoutes.replace('Schedules and Fares', '');
  const mapsOfTheStatinns = schedulesAndFares.replace(
    'Maps of this station:',
    '',
  );

  const result = mapsOfTheStatinns.replace('Maps of this station', '');
  const mapsOfTheStatoin = result.replace('Maps of the station:', '');

  return mapsOfTheStatoin;
};

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

  if (!stationData) {
    return <div>no data</div>;
  }

  return (
    <div>
      <HeaderName>{stationData.name}</HeaderName>
      <div>
        {stationData.address}, {stationData.city}, {stationData.state}{' '}
        {stationData.zipcode}
      </div>
      <p>{remoteArtifactors(stationData.intro)}</p>
    </div>
  );
};
