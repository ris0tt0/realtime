import { Box, createTheme, Paper, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { initBartApp, setName } from './actions';
import Page from './pages';
import { store } from './store';

const theme = createTheme({
  palette: { type: 'dark' },
});

store.dispatch(setName("jonathan's bart application"));
store.dispatch(initBartApp());

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Paper>
          <Box
            display="flex"
            flex={1}
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <Page />
          </Box>
        </Paper>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
