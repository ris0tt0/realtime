import { createTheme, ThemeProvider } from '@material-ui/core';
import Logger from 'js-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { setName } from './actions';
import {
  requestBsa,
  requestCount,
  requestElevator,
} from './actions/advisories.';
import { requestEtd } from './actions/real-time-estimates';
import { App } from './app';
import { store } from './store';

Logger.useDefaults();

store.dispatch(setName('jonathan gee bart app'));
store.dispatch(requestEtd('mcar'));
store.dispatch(requestBsa());
store.dispatch(requestCount());
store.dispatch(requestElevator());

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
