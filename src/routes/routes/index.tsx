import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutesListSelection } from '../../containers/routesListSelection';
import { RoutesContainerStyled } from '../styled';

export const BartRoutes: FC = () => {
  const navigate = useNavigate();
  return (
    <RoutesContainerStyled>
      <h1>Routes</h1>
      <RoutesListSelection onSelectRoute={(abbr) => navigate(abbr)} />
      <Outlet />
    </RoutesContainerStyled>
  );
};
