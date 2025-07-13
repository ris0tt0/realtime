import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useRoutes } from '../../hooks/useRoutes';
import {
  RoutesContainerListStyled,
  RoutesContainerStyled,
  RoutesLinkStyled,
} from '../styled';

export const BartRoutes: FC = () => {
  const routes = useRoutes();
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
