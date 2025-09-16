import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { BartStationScheduleItem } from '../../../db';
import { useRoutesMap } from '../../../hooks/useRoutes';
import { useStationsMap } from '../../../hooks/useStations';
import {
  BackgroundPaperContainer,
  ListItemContainer,
  UnorderedListContainer,
} from '../../../styled';

const ScheduleItemTime = styled('span')`
  font-weight: bold;
  white-space: nowrap;
`;

export const ScheduleTime: FC<{
  title: string;
  items?: BartStationScheduleItem[];
}> = ({ items, title }) => {
  const routes = useRoutesMap();
  const stations = useStationsMap();

  if (!items) return null;

  const platform1 = items.map((item) => {
    const line = routes[item.line] ?? null;
    const destination = stations[line.destinationStation] ?? null;

    return (
      <ListItemContainer
        color={line.color}
        key={`${item.origTime}-${item.line}`}
      >
        <Stack direction="row" gap="0.5rem">
          <ScheduleItemTime>{item.origTime}</ScheduleItemTime>
          {destination?.name}
        </Stack>
      </ListItemContainer>
    );
  });

  return (
    <Stack flex={1}>
      <BackgroundPaperContainer>
        <Stack sx={{ margin: '0.5rem 0.5rem' }}>{title}</Stack>
      </BackgroundPaperContainer>
      <Stack sx={{ margin: '0 0.5rem' }}>
        <Stack height={300} overflow="auto">
          <UnorderedListContainer>{platform1}</UnorderedListContainer>
        </Stack>
      </Stack>
    </Stack>
  );
};
