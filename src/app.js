import { Box, Paper } from '@material-ui/core';
import React from 'react';

export const App = () => {
  return (
    <Paper>
      <Box
        display="flex"
        flex={1}
        height="100vh"
        justifyContent="center"
        alignItems="center"
      ></Box>
    </Paper>
  );
};
