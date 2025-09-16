import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

const MUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    colorSchemes: {
      dark: {
        palette: {
          background: {
            paper: '#2c2c2cff',
          },
        },
      },
      light: {
        palette: {
          background: {
            paper: '#f2f2f2ff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { MUIProvider };
