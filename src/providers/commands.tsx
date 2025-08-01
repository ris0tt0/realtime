import { styled } from '@mui/material';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { RealTimeApi } from '../api';
import { RealTimeApiImpl } from '../api/realtime';
import { Commands } from '../commands';
import CommandsImpl from '../commands/commands';
import { CommandsContext } from '../contexts/commands';
import { DB } from '../db';
import { IndexedDB } from '../db/indexedDB';
import { useSetRTE } from '../hooks/useRealTimeEstimates';
import { useSetRoutes } from '../hooks/useRoutes';
import { useSetRTEUpdatedTime } from '../hooks/useRTEUpdatedTime';
import { useSetStations, useStationsMap } from '../hooks/useStations';
import { useSetTotalTrainsInService } from '../hooks/useTotalTrains';
import { Loading } from '../routes/styled/loading';

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
  const stationsMap = useStationsMap();
  const setRTE = useSetRTE();
  const setRoutes = useSetRoutes();
  const setStations = useSetStations();
  const setTotalTrainsInService = useSetTotalTrainsInService();
  const setRteUpdatedTimestamp = useSetRTEUpdatedTime();

  useEffect(() => {
    const api: RealTimeApi = new RealTimeApiImpl();
    const db: DB = new IndexedDB();

    const commands: Commands = new CommandsImpl({
      api,
      db,
      stationsMap,
      setRTE,
      setRoutes,
      setStations,
      setTotalTrainsInService,
      setRteUpdatedTimestamp,
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
    return <Loading />;
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};

export default CommandsProvider;
