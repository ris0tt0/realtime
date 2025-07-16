import { Refresh } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { StationsParams } from '../../routes';

export const RTEStationUpdated: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();

  const handleClick = () => {
    Logger.info('Refreshing station details', stationId);
  };
  return (
    <span>
      <span>Updated 5:09pm</span>
      <IconButton onClick={handleClick}>
        <Refresh />
      </IconButton>
    </span>
  );
};
