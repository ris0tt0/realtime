import React, { FC } from 'react';
import { LoadingStyled } from '.';
import { LinearProgress } from '@mui/material';

export const Loading: FC = () => {
  return (
    <LoadingStyled>
      <LinearProgress sx={{ width: '200px' }} />
    </LoadingStyled>
  );
};
