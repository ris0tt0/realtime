import { Box, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StationsParams } from '..';
import { BartStationDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { removeArtifacts } from '../../utils';
import { Loading } from '../styled/loading';
import { RouteLines } from './components/routeLines';
import { RteList } from './components/rteList';
import { StationScheduleList } from './components/stationScheduleList';

const StationDetailInfoContainer = styled('section')`
  display: flex;
  flex: 1;
`;

const StationInfoContainer = styled('section')(({ theme }) => {
  return {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  };
});

const StationInfoItemContainer = styled('section')(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };
});

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
    <>
      <h2>{stationData.name}</h2>
      <p>
        {stationData.address}, {stationData.city}, {stationData.state}{' '}
        {stationData.zipcode}
      </p>
      <p>{removeArtifacts(stationData.intro)}</p>
      <StationInfoContainer>
        <StationInfoItemContainer>
          <RouteLines
            north={stationData.north_routes.route}
            south={stationData.south_routes.route}
          />
        </StationInfoItemContainer>
        <StationInfoItemContainer>
          <RteList compact={true} id={stationId} />
        </StationInfoItemContainer>
      </StationInfoContainer>
      <StationDetailInfoContainer>
        <StationScheduleList id={stationId} />
      </StationDetailInfoContainer>
    </>
  );
};
