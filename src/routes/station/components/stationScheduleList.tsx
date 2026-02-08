import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BartStationScheduleDetail,
  BartStationScheduleItem,
} from '../../../db';
import { useCommands } from '../../../hooks/useCommands';
import { ScheduleTime } from './scheduleTime';

const ScheduleControlsContainer = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  };
});

const ScheduleContainer = styled('section')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  background: ${theme.palette.background.paper};
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`,
);

type ScheduleType = 'today' | 'wd' | 'sa' | 'su';

type PlatformSchedule = {
  name: string;
  label: string;
  items: BartStationScheduleItem[];
};

export const PlatformSchedules: FC<{
  schedules: PlatformSchedule[];
}> = ({ schedules }) => {
  const items = schedules.map((schedule) => {
    return <ScheduleTime title={schedule.name} items={schedule.items} />;
  });

  return <>{items}</>;
};

const Schedules: FC<{ loading: boolean; data: PlatformSchedule[] }> = ({
  data,
  loading,
}) => {
  const theme = useTheme();
  const middle = useMediaQuery(theme.breakpoints.down('md'));
  const [radioGroupValue, setRadioGroupValue] = useState('');

  useEffect(() => {
    if (data?.[0]?.name) {
      setRadioGroupValue(data[0].name);
    }
  }, [data]);

  const handleRadioGroup = useCallback((e: any) => {
    setRadioGroupValue(e.target.value);
  }, []);

  const formControls = useMemo(() => {
    return data.map((control) => {
      return (
        <FormControlLabel
          key={control.name}
          value={control.name}
          control={<Radio />}
          label={control.label}
        />
      );
    });
  }, [data]);

  const scheduleItems = useMemo(() => {
    const results = data.map((control) => {
      return (
        <ScheduleTime
          key={control.name}
          title={control.name}
          items={control.items}
        />
      );
    });
    return results;
  }, [data]);

  const scheduleItem = useMemo(() => {
    const results = data.find((control) => control.name === radioGroupValue);
    if (results)
      return (
        <ScheduleTime
          key={results.name}
          title={results.name}
          items={results.items}
        />
      );
    return null;
  }, [data, radioGroupValue]);

  return (
    <Fragment>
      {middle ? (
        <FormControl disabled={data.length < 2 || loading}>
          <FormLabel id="platforms-radio-buttons-group-label">
            Platform
          </FormLabel>
          <RadioGroup
            aria-labelledby="platforms-radio-buttons-group-label"
            row
            onChange={handleRadioGroup}
            value={radioGroupValue}
            defaultValue={radioGroupValue}
            name="platforms-radio-buttons-group"
          >
            {formControls}
          </RadioGroup>
        </FormControl>
      ) : null}
      {middle ? (
        <>{scheduleItem}</>
      ) : (
        <Stack direction="row">{scheduleItems}</Stack>
      )}
    </Fragment>
  );
};

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

  const scheduleData = useMemo(() => {
    const result = [];
    if (scheduleDetail?.platforms['PL 1']) {
      result.push({
        name: 'platform 1',
        label: '1',
        items: scheduleDetail?.platforms['PL 1'],
      });
    }
    if (scheduleDetail?.platforms['PL 2']) {
      result.push({
        name: 'platform 2',
        label: '2',
        items: scheduleDetail?.platforms['PL 2'],
      });
    }
    if (scheduleDetail?.platforms['PL 3']) {
      result.push({
        name: 'platform 3',
        label: '3',
        items: scheduleDetail?.platforms['PL 3'],
      });
    }
    if (scheduleDetail?.platforms['PL 4']) {
      result.push({
        name: 'platform 4',
        label: '4',
        items: scheduleDetail?.platforms['PL 4'],
      });
    }
    return result;
  }, [scheduleDetail]);

  return (
    <ScheduleContainer>
      <Stack>
        <h3>Station Schedule Results</h3>
        <ScheduleControlsContainer>
          <ButtonGroup
            component="nav"
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
        <Schedules loading={loading} data={scheduleData} />
      </Stack>
    </ScheduleContainer>
  );
};
