import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TrainsInService } from '../../containers/rte/trainsInService';
import { StationsListSelection } from '../../containers/stationsListSelection';
import { RoutesContainerStyled } from '../styled';

export const RealTimeEstimates: FC = () => {
  const navigate = useNavigate();

  return (
    <RoutesContainerStyled>
      <h1>Real Time Estimates</h1>
      <TrainsInService />
      <StationsListSelection
        onSelectStationAbbr={(stationId: string) => navigate(stationId)}
      />
      <Outlet />
    </RoutesContainerStyled>
  );
};
