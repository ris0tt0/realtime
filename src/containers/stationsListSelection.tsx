import { Button, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { useStations } from '../hooks/useStations';
import { ListSelectionContainer } from './styled';

export const StationListSelection: FC<{
  onSelectStationAbbr: (abbr: string) => void;
}> = ({ onSelectStationAbbr }) => {
  const [stationId, setStationId] = useState('12TH');
  const stations = useStations();

  const handleClick = () => {
    onSelectStationAbbr(stationId);
  };

  const items = stations.map((station) => (
    <MenuItem
      key={station.abbr}
      value={station.abbr}
      onClick={() => setStationId(station.abbr)}
    >
      {station.name}
    </MenuItem>
  ));

  return (
    <ListSelectionContainer>
      <Select fullWidth value={stationId}>
        {items}
      </Select>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
