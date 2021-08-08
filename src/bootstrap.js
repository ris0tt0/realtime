import { createTheme, ThemeProvider } from '@material-ui/core';
import Logger from 'js-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { setName } from './actions';
import { App } from './app';
import { store } from './store';

Logger.useDefaults();

store.dispatch(setName('jonathan gee bart app'));

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('g-bart')
);
