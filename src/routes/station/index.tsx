import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { StationsListSelection } from '../../containers/stationsListSelection';
import { RoutesContainerStyled } from '../styled';

export const BartStations: FC = () => {
  const navigate = useNavigate();

  return (
    <RoutesContainerStyled>
      <StationsListSelection
        onSelectStationAbbr={(stationId: string) => navigate(stationId)}
      />
      <Outlet />
    </RoutesContainerStyled>
  );
};
