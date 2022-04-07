import Logger from 'js-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'tw-elements';
import { setName } from './actions';
import { App } from './app';
import { commands } from './commands';
import './index.css';
import { store } from './store';

Logger.useDefaults();
const cmd = commands(store.dispatch);
cmd.init();

store.dispatch(setName('jonathan gee bart app'));

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('g-bart')
);
