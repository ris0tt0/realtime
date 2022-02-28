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

import './index.css';
import { BrowserRouter } from 'react-router-dom';

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

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('g-bart')
);
