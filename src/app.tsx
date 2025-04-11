import React, { FC } from 'react';
import CommandsProvider from './providers/commands';
import { MUIProvider } from './providers/mui';
import { Routes } from './routes';

export const App: FC = () => {
  return (
    <MUIProvider>
      <CommandsProvider>
        <Routes />
      </CommandsProvider>
    </MUIProvider>
  );
};
