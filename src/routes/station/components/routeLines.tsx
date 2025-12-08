import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useRouteLines } from '../../../hooks/useRoutes';
import { Lines } from './lines';

export const RouteLines: FC<{ north: string[]; south: string[] }> = ({
  north,
  south,
}) => {
  const southLine = useRouteLines(south);
  const northLine = useRouteLines(north);

  return (
    <>
      <h3>Lines Serving This Station</h3>
      <Lines title="north" line={northLine} />
      <Lines title="south" line={southLine} />
    </>
  );
};
