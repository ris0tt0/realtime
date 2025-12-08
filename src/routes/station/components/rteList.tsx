import { Box, Stack } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { RTEStationNameList } from '../../../containers/rte/stationList';
import { useCommands } from '../../../hooks/useCommands';
import { useRte } from '../../../hooks/useRte';
import { LinesRteContainer } from '../../styled';
import { useRteUpdatedTime } from '../../../hooks/useRteUpdatedTime';

export const RteList: FC<{ id?: string; compact: boolean }> = ({
  id,
  compact = true,
}) => {
  const commands = useCommands();
  const current = useRte(id);
  const updated = useRteUpdatedTime(id);
  const [updatedTime, setUpdatedTime] = useState('');

  useEffect(() => {
    if (!id) return;
    commands.updateStationRealTimeEstimates(id);
  }, [id]);

  useEffect(() => {
    if (!updated) return;
    const time = format(updated, 'h:mm aaa');
    setUpdatedTime(`updated: ${time}`);
  }, [updated]);

  if (!current || !id) {
    return null;
  }

  return (
    <>
      <h3>Real Time Departures</h3>
      <Box sx={{ alignSelf: 'flex-end' }}>{updatedTime}</Box>
      <RTEStationNameList compact={compact} station={current.data} />
    </>
  );
};
