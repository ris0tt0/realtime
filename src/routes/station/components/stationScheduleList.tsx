import {
  Button,
  ButtonGroup,
  LinearProgress,
  Stack,
  styled,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { BartStationScheduleDetail } from '../../../db';
import { useCommands } from '../../../hooks/useCommands';
import { ScheduleTime } from './scheduleTime';

const ScheduleControlsContainer = styled('div')`
  display: flex;
  align-items: center;
`;

type ScheduleType = 'today' | 'wd' | 'sa' | 'su';

export const StationScheduleList: FC<{ id?: string }> = ({ id }) => {
  const commands = useCommands();
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState<ScheduleType>('today');
  const [scheduleDetail, setScheduleDetail] =
    useState<BartStationScheduleDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    commands
      .getStationSchedule(id, day)
      .then((schedule) => {
        setScheduleDetail(schedule);
      })
      .finally(() => setLoading(false));
  }, [id, day]);

  const items1 = scheduleDetail?.platforms['PL 1'];
  const items2 = scheduleDetail?.platforms['PL 2'];
  const items3 = scheduleDetail?.platforms['PL 3'];
  const items4 = scheduleDetail?.platforms['PL 4'];

  return (
    <Stack flex={1}>
      <Stack>
        <h3>Station Schedule Results</h3>
        <ScheduleControlsContainer>
          <ButtonGroup
            component="menu"
            disabled={loading}
            variant="text"
            aria-label="select day button group"
            sx={{ padding: 0, margin: 0 }}
          >
            <Button disabled={day === 'today'} onClick={() => setDay('today')}>
              today
            </Button>
            <Button disabled={day === 'wd'} onClick={() => setDay('wd')}>
              weekday
            </Button>
            <Button disabled={day === 'sa'} onClick={() => setDay('sa')}>
              saturday
            </Button>
            <Button disabled={day === 'su'} onClick={() => setDay('su')}>
              sunday
            </Button>
          </ButtonGroup>
          {scheduleDetail?.date && (
            <div>for the date of {scheduleDetail.date}</div>
          )}
        </ScheduleControlsContainer>
      </Stack>
      <Stack flex={1} direction="row">
        {loading ? (
          <Stack
            height={540}
            flex="1"
            justifyContent="center"
            alignItems="center"
          >
            <LinearProgress
              sx={{
                width: '200px',
              }}
            />
          </Stack>
        ) : (
          <>
            <ScheduleTime title="platform 1" items={items1} />
            <ScheduleTime title="platform 2" items={items2} />
            <ScheduleTime title="platform 3" items={items3} />
            <ScheduleTime title="platform 4" items={items4} />
          </>
        )}
      </Stack>
    </Stack>
  );
};
