import { Refresh } from '@mui/icons-material';
import { IconButton, styled, Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, useState } from 'react';
import { useCommands } from '../../hooks/useCommands';
import { useRTEUpdatedTime } from '../../hooks/useRTEUpdatedTime';
import { useParams } from 'react-router-dom';
import { StationsParams } from '../../routes';

// 15 seconds
const TOTTAL_MS = 15 * 1000;

const UpdatedContainer = styled('div')`
  display: flex;
  align-items: end;
  flex-direction: column;
`;

export const RTEStationUpdated: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();
  const [error, setError] = useState(false);
  const updated = useRTEUpdatedTime();

  const handleClick = () => {
    const now = Date.now();
    const when = updated.valueOf();
    const diff = now - when;

    if (diff < TOTTAL_MS) {
      setError(true);
      return;
    }

    setError(false);
    if (stationId) commands.udpateStationRealTimeEstimates(stationId);
  };

  const time = format(updated, 'h:mm aaa');

  return (
    <UpdatedContainer>
      <span>
        <span>Updated {time}</span>
        <IconButton onClick={handleClick}>
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
