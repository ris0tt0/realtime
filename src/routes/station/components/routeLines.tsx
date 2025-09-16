import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { useRouteLines } from '../../../hooks/useRoutes';
import { BackgroundPaperContainer } from '../../../styled';
import { Lines } from './lines';

const LinesServicingContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const RouteLines: FC<{ north: string[]; south: string[] }> = ({
  north,
  south,
}) => {
  const southLine = useRouteLines(south);
  const northLine = useRouteLines(north);

  return (
    <LinesServicingContainer>
      <BackgroundPaperContainer>
        <Stack flex={1} sx={{ margin: '0.5rem 0' }}>
          Lines serving this station
        </Stack>
      </BackgroundPaperContainer>
      <Lines title="north" line={northLine} />
      <Lines title="south" line={southLine} />
    </LinesServicingContainer>
  );
};
