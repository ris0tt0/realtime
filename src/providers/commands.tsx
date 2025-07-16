import { styled } from '@mui/material';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { RealTimeApi } from '../api';
import { RealTimeApiImpl } from '../api/realtime';
import { Commands } from '../commands';
import CommandsImpl from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { DB } from '../db';
import { IndexedDB } from '../db/indexedDB';
import { useSetRoutes } from '../hooks/useRoutes';
import { useSetStations } from '../hooks/useStations';
import { useSetTotalTrainsInService } from '../hooks/useTotalTrains';

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
  const setRoutes = useSetRoutes();
  const setStations = useSetStations();
  const setTotalTrainsInService = useSetTotalTrainsInService();

  useEffect(() => {
    const api: RealTimeApi = new RealTimeApiImpl();
    const db: DB = new IndexedDB();

    const commands: Commands = new CommandsImpl({
      api,
      db,
      setRoutes,
      setStations,
      setTotalTrainsInService,
    });

    commands
      .init()
      .then(() => {
        setCommands(commands);
      })
      .catch(() => setIsError(true));
  }, []);

  if (isError) {
    return <StatusContainer>error😔</StatusContainer>;
  }

  if (!commands) {
    return <StatusContainer>initing</StatusContainer>;
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};

export default CommandsProvider;
