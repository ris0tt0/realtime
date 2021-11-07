import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logger from 'js-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  requestBsa,
  requestCount,
  requestElevator,
  requestEtd,
  requestFare,
  requestRouteInfo,
  requestRoutes,
  requestRouteSchedule,
  requestSpecial,
  requestStationAccess,
  requestStationInfo,
  requestStations,
  requestStationSchedule,
  requestTrip,
  setName,
} from './actions';
import { App } from './app';
import { store } from './store';

Logger.useDefaults();

store.dispatch(setName('jonathan gee bart app'));
store.dispatch(requestEtd('mcar'));
store.dispatch(requestBsa());
store.dispatch(requestCount());
store.dispatch(requestElevator());
store.dispatch(requestRouteInfo(1));
store.dispatch(requestRoutes());
store.dispatch(requestTrip());
store.dispatch(requestFare());
store.dispatch(requestRouteSchedule());
store.dispatch(requestSpecial());
store.dispatch(requestStationSchedule());
store.dispatch(requestStationAccess());
store.dispatch(requestStationInfo());
store.dispatch(requestStations());

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('g-bart')
);
