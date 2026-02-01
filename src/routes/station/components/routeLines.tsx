import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useRouteLines } from '../../../hooks/useRoutes';
import { Lines } from './lines';

const Container = styled('section')(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  padding: 0.5rem;
  width: 100%;
  height: 100%;
`,
);

export const RouteLines: FC<{ north: string[]; south: string[] }> = ({
  north,
  south,
}) => {
  const southLine = useRouteLines(south);
  const northLine = useRouteLines(north);

  return (
    <Container>
      <h3>Lines Serving This Station</h3>
      <Lines title="north" line={northLine} />
      <Lines title="south" line={southLine} />
    </Container>
  );
};
