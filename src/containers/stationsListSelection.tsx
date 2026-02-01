import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStations } from '../hooks/useStations';
import { StationsParams } from '../routes';
import { ListSelectionContainer } from './styled';

export const StationsListSelection: FC<{
  onSelectStationAbbr: (abbr: string) => void;
}> = ({ onSelectStationAbbr }) => {
  const { stationId = '12TH' } = useParams<StationsParams>();
  const [currentStationId, setCurrentStationId] = useState(stationId);
  const stations = useStations();

  const handleClick = useCallback(() => {
    onSelectStationAbbr(currentStationId);
  }, [onSelectStationAbbr, currentStationId]);

  const items = useMemo(() => {
    return stations.map((station) => (
      <MenuItem
        key={station.abbr}
        value={station.abbr}
        onClick={() => setCurrentStationId(station.abbr)}
      >
        {station.name}
      </MenuItem>
    ));
  }, [stations]);

  return (
    <ListSelectionContainer>
      <FormControl fullWidth>
        <InputLabel id="stations-select-label">Stations</InputLabel>
        <Select
          labelId="stations-select-label"
          fullWidth
          value={currentStationId}
        >
          {items}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </ListSelectionContainer>
  );
};
