import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useRTAppStore } from '../../store/useRTAppStore';
import {
  RoutesContainerListStyled,
  RoutesContainerStyled,
  RoutesLinkStyled,
} from '../styled';

export const BartRoutes: FC = () => {
  const routes = useRTAppStore((state) => state.routes);
  return (
    <RoutesContainerStyled>
      <RoutesContainerListStyled>
        {routes.map((route) => (
          <RoutesLinkStyled to={`${route.number}`} key={route.abbr}>
            {route.name}
          </RoutesLinkStyled>
        ))}
      </RoutesContainerListStyled>
      <Outlet />
    </RoutesContainerStyled>
  );
};
