import { Button, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoutes } from '../hooks/useRoutes';
import { RoutesParams } from '../routes';
import { ListSelectionContainer } from './styled';

export const RoutesListSelection: FC<{
  onSelectRoute: (abbr: string) => void;
}> = ({ onSelectRoute: onSelectStationAbbr }) => {
  const { routeNumber = '1' } = useParams<RoutesParams>();
  const [currentRouteNumber, setCurrentRouteNumber] = useState(routeNumber);
  const routes = useRoutes();

  const handleClick = () => {
    onSelectStationAbbr(currentRouteNumber);
  };

  const items = routes.map((route) => (
    <MenuItem
      key={route.abbr}
      value={route.number}
      onClick={() => setCurrentRouteNumber(route.number)}
    >
      {route.name}
    </MenuItem>
  ));

  return (
    <ListSelectionContainer>
      <Select fullWidth value={currentRouteNumber}>
        {items}
      </Select>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
