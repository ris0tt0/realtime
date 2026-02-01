import { Refresh } from '@mui/icons-material';
import { IconButton, styled, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommands } from '../../hooks/useCommands';
import { StationsParams } from '../../routes';
import { useRteUpdatedTime } from '../../hooks/useRteUpdatedTime';

// 15 seconds
const TOTAL_MS = 15 * 1000;

const UpdatedContainer = styled('div')`
  display: flex;
  align-items: end;
  flex-direction: column;
`;

export const RTEStationUpdated: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();
  const [error, setError] = useState(false);
  const updated = useRteUpdatedTime(stationId);

  if (!updated) return;

  const handleClick = () => {
    const now = Date.now();
    const when = updated.valueOf();
    const diff = now - when;

    if (diff < TOTAL_MS) {
      setError(true);
      return;
    }

    setError(false);
    if (stationId) commands.updateStationRealTimeEstimates(stationId);
  };

  const time = format(updated, 'h:mm aaa');

  return (
    <UpdatedContainer>
      <span>
        <span>Updated {time}</span>
        <IconButton onClick={handleClick} aria-label="Refresh">
          <Refresh />
        </IconButton>
      </span>
      {error && (
        <Typography variant="caption" sx={{ color: 'error.main' }}>
          wait 15 seconds
        </Typography>
      )}
    </UpdatedContainer>
  );
};
