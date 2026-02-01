import React, { FC, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RoutesListSelection } from '../../containers/routesListSelection';
import { RoutesContainerStyled } from '../styled';

export const BartRoutes: FC = () => {
  const navigate = useNavigate();
  const handleRoutesSelection = useCallback(
    (abbr: string) => navigate(abbr),
    [navigate],
  );
  return (
    <RoutesContainerStyled>
      <RoutesListSelection onSelectRoute={handleRoutesSelection} />
      <Outlet />
    </RoutesContainerStyled>
  );
};
