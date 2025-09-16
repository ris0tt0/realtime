import { styled } from '@mui/material';
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

export const HeaderTwoName = styled('h2')`
  margin-bottom: 0px;
`;

const StationDetailInfoContainer = styled('div')`
  display: flex;
  flex: 1;
`;

const HalfContainer = styled('div')`
  display: flex;
  width: 50%;
`;

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
      <HeaderTwoName>{stationData.name}</HeaderTwoName>
      <div>
        {stationData.address}, {stationData.city}, {stationData.state}{' '}
        {stationData.zipcode}
      </div>
      <p>{removeArtifacts(stationData.intro)}</p>
      <StationDetailInfoContainer>
        <HalfContainer>
          <RouteLines
            north={stationData.north_routes.route}
            south={stationData.south_routes.route}
          />
        </HalfContainer>
        <HalfContainer>
          <RteList compact={true} id={stationId} />
        </HalfContainer>
      </StationDetailInfoContainer>
      <StationDetailInfoContainer>
        <StationScheduleList id={stationId} />
      </StationDetailInfoContainer>
    </div>
  );
};
