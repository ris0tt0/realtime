import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useStations } from '../../hooks/useStations';
import {
  RoutesContainerListStyled,
  RoutesContainerStyled,
  RoutesLinkStyled,
} from '../styled';

export const BartStations: FC = () => {
  const stations = useStations();

  return (
    <RoutesContainerStyled>
      <RoutesContainerListStyled>
        {stations.map((station) => (
          <RoutesLinkStyled to={`${station.abbr}`} key={station.abbr}>
            {station.name}
          </RoutesLinkStyled>
        ))}
      </RoutesContainerListStyled>
      <Outlet />
    </RoutesContainerStyled>
  );
};
