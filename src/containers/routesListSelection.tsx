import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
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

  const handleClick = useCallback(() => {
    onSelectStationAbbr(currentRouteNumber);
  }, [onSelectStationAbbr, currentRouteNumber]);

  const items = useMemo(() => {
    return routes.map((route) => (
      <MenuItem
        key={route.abbr}
        value={route.number}
        onClick={() => setCurrentRouteNumber(route.number)}
      >
        {route.name}
      </MenuItem>
    ));
  }, [routes]);

  return (
    <ListSelectionContainer>
      <FormControl fullWidth>
        <InputLabel id="routes-select-label">Routes</InputLabel>
        <Select labelId="routes-select-label" value={currentRouteNumber}>
          {items}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
