import { Stack } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { RTEStationNameList } from '../../../containers/rte/stationList';
import { useCommands } from '../../../hooks/useCommands';
import { useRte } from '../../../hooks/useRte';
import { BackgroundPaperContainer } from '../../../styled';
import { LinesRteContainer } from '../../styled';
import { useRteUpdatedTime } from '../../../hooks/useRTEUpdatedTime';

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
    commands.udpateStationRealTimeEstimates(id);
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
    <Stack flex={1}>
      <BackgroundPaperContainer>
        <Stack
          sx={{ margin: '0.5rem 0' }}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <div>real time departues</div>
          <div>{updatedTime}</div>
        </Stack>
      </BackgroundPaperContainer>
      <LinesRteContainer>
        <RTEStationNameList compact={compact} station={current.data} />
      </LinesRteContainer>
    </Stack>
  );
};
