import { Button, MenuItem, Select } from '@mui/material';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStations } from '../hooks/useStations';
import { StationsParams } from '../routes';
import { ListSelectionContainer } from './styled';

export const StationsListSelection: FC<{
  onSelectStationAbbr: (abbr: string) => void;
}> = ({ onSelectStationAbbr }) => {
  const { stationId = '12TH' } = useParams<StationsParams>();
  const [currentStationId, setCurrentStationid] = useState(stationId);
  const stations = useStations();

  const handleClick = () => {
    onSelectStationAbbr(currentStationId);
  };

  const items = stations.map((station) => (
    <MenuItem
      key={station.abbr}
      value={station.abbr}
      onClick={() => setCurrentStationid(station.abbr)}
    >
      {station.name}
    </MenuItem>
  ));

  return (
    <ListSelectionContainer>
      <Select fullWidth value={currentStationId}>
        {items}
      </Select>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
