import { Button, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import React, { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStations } from '../../hooks/useStations';
import { useTotalTrainsInService } from '../../hooks/useTotalTrains';
import { RoutesContainerStyled } from '../styled';

const TrainSelectionContainer = styled('div')`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const TrainsInService: FC = () => {
  const total = useTotalTrainsInService();

  return <span>{total} trains currently in service</span>;
};

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
    <TrainSelectionContainer>
      <Select fullWidth value={stationId}>
        {items}
      </Select>
      <Button variant="outlined" onClick={handleClick}>
        Select
      </Button>
    </TrainSelectionContainer>
  );
};

export const RealTimeEstimates: FC = () => {
  const navigate = useNavigate();

  return (
    <RoutesContainerStyled>
      <h1>Real Time Estimates</h1>
      <TrainsInService />
      <StationListSelection
        onSelectStationAbbr={(stationId: string) => navigate(stationId)}
      />
      <Outlet />
    </RoutesContainerStyled>
  );
};
