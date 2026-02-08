import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';
import { LoadingStyled } from '.';

export const Loading: FC = () => {
  return (
    <LoadingStyled>
      <LinearProgress sx={{ width: '200px' }} />
    </LoadingStyled>
  );
};
