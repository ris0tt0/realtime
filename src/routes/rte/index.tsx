import React, { FC, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { StationsListSelection } from '../../containers/stationsListSelection';
import { RoutesContainerStyled } from '../styled';

export const RealTimeEstimates: FC = () => {
  const navigate = useNavigate();

  const handleStationSelection = useCallback(
    (stationId: string) => navigate(stationId),
    [navigate],
  );

  return (
    <RoutesContainerStyled>
      <StationsListSelection onSelectStationAbbr={handleStationSelection} />
      <Outlet />
    </RoutesContainerStyled>
  );
};
