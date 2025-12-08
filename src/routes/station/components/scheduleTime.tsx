import { Box, Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { BartStationScheduleItem } from '../../../db';
import { useRoutesMap, useRoutesNumberMap } from '../../../hooks/useRoutes';
import { useStationsMap } from '../../../hooks/useStations';
import { ListItemContainer, UnorderedListContainer } from '../../../styled';

const ScheduleItemTime = styled('span')`
  font-weight: bold;
  white-space: nowrap;
`;

export const ScheduleTime: FC<{
  title: string;
  items?: BartStationScheduleItem[];
}> = ({ items, title }) => {
  const routes = useRoutesNumberMap();
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
      <Box component="h4" sx={{ margin: '0.5rem 0.5rem' }}>
        {title}
      </Box>
      <Stack sx={{ margin: '0 0.5rem' }}>
        <Stack height={450} overflow="auto">
          <UnorderedListContainer>{platform1}</UnorderedListContainer>
        </Stack>
      </Stack>
    </Stack>
  );
};
