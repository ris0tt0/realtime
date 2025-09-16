import { styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { RealTimeApi } from '../api';
import { RealTimeApiImpl } from '../api/realtime';
import { Commands } from '../commands';
import CommandsImpl from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { DB } from '../db';
import { IndexedDB } from '../db/indexedDB';
import { Loading } from '../routes/styled/loading';
import { useRteDispatch } from '../store';
import { RteState } from '../store/rte';

const StatusContainer = styled('div')`
  display: flex,
  justifyContent: center,
  alignItems: 'center,
  height: 100%,
  width: 100%,
`;

export const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [commands, setCommands] = useState<Commands | null>(null);
  const dispatch = useRteDispatch();
  const store = useStore<RteState>();

  Logger.info('CommandsProvider::init');

  useEffect(() => {
    const api: RealTimeApi = new RealTimeApiImpl();
    const db: DB = new IndexedDB();

    const commands: Commands = new CommandsImpl({
      api,
      db,
      dispatch,
      store,
    });

    commands
      .init()
      .then(() => {
        setCommands(commands);
      })
      .catch((error) => {
        Logger.error('commands::provider', error);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <StatusContainer>error😔</StatusContainer>;
  }

  if (!commands) {
    return <Loading />;
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};

export default CommandsProvider;
