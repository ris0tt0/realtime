import Logger from 'js-logger';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'tw-elements';
import { setName } from './actions';
import App from './app';
import { Commands } from './commands';
import './index.css';
import { store } from './store';

Logger.useDefaults();

const commands = Commands.getInstance(store.dispatch);
commands.init();

store.dispatch(setName('jonathan gee bart app'));

const container = document.getElementById('g-bart');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
