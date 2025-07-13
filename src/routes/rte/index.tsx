import { Button, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import Logger from 'js-logger';
import React, { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStations } from '../../hooks/useStations';
import { RoutesContainerStyled } from '../styled';
import { useTotalTrainsInService } from '../../hooks/useTotalTrains';

const TrainSelectionContainer = styled('div')`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const TrainsInService: FC = () => {
  const total = useTotalTrainsInService();

  return <span>{total} trains currently in service</span>;
};

export const RealTimeEstimates: FC = () => {
  const [stationId, setStationid] = useState('12TH');
  const navigate = useNavigate();
  const stations = useStations();

  const handleClick = () => {
    Logger.info('Station selected:', stationId);
    navigate(`${stationId}`);
  };

  const items = stations.map((station) => (
    <MenuItem
      key={station.abbr}
      value={station.abbr}
      onClick={() => setStationid(station.abbr)}
    >
      {station.name}
    </MenuItem>
  ));

  return (
    <RoutesContainerStyled>
      <h1>Real Time Estimates</h1>
      <TrainsInService />
      <TrainSelectionContainer>
        <Select fullWidth value={stationId}>
          {items}
        </Select>
        <Button variant="outlined" onClick={handleClick}>
          Select
        </Button>
      </TrainSelectionContainer>
      <Outlet />
    </RoutesContainerStyled>
  );
};
