import Logger from 'js-logger';
import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';

const App = lazy(() => import('./app'));

const node = document.getElementById('jay-brt');

if (process.env.NODE_ENV === 'development') {
  Logger.useDefaults();
}

if (node) {
  const root = createRoot(node);

  root.render(<App />);
}
