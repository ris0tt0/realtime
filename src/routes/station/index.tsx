import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { StationListSelection } from '../rte';
import { RoutesContainerStyled } from '../styled';

export const BartStations: FC = () => {
  const navigate = useNavigate();

  return (
    <RoutesContainerStyled>
      <h1>Stations</h1>
      <StationListSelection
        onSelectStationAbbr={(stationId: string) => navigate(stationId)}
      />
      <Outlet />
    </RoutesContainerStyled>
  );
};
