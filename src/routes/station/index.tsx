import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useRTAppStore } from '../../store/useRTAppStore';
import {
  RoutesContainerListStyled,
  RoutesContainerStyled,
  RoutesLinkStyled,
} from '../styled';

export const BartStations: FC = () => {
  const stations = useRTAppStore((state) => state.stations);

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
