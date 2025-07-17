import { Button, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { useRoutes } from '../hooks/useRoutes';
import { ListSelectionContainer } from './styled';

export const RoutesListSelection: FC<{
  onSelectRoute: (abbr: string) => void;
}> = ({ onSelectRoute: onSelectStationAbbr }) => {
  const [routeNumber, setRouteNumber] = useState('1');
  const routes = useRoutes();

  const handleClick = () => {
    onSelectStationAbbr(routeNumber);
  };

  const items = routes.map((route) => (
    <MenuItem
      key={route.abbr}
      value={route.number}
      onClick={() => setRouteNumber(route.number)}
    >
      {route.name}
    </MenuItem>
  ));

  return (
    <ListSelectionContainer>
      <Select fullWidth value={routeNumber}>
        {items}
      </Select>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
