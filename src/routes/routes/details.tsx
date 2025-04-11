import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoutesParams } from '..';
import { BartRouteDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { Loading } from '../styled/loading';

export const RouteDetail: FC = () => {
  const commands = useCommands();
  const [dataLoading, setDataLoading] = useState(false);
  const { routeNumber } = useParams<RoutesParams>();
  const [routeData, setRouteData] = useState<BartRouteDetail | null>(null);

  useEffect(() => {
    if (routeNumber) {
      setDataLoading(true);
      commands
        .getRouteDetails(routeNumber)
        .then((data) => {
          setRouteData(data ?? null);
        })
        .finally(() => setDataLoading(false));
    }
  }, [routeNumber]);

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{routeData?.name}</h1>
    </div>
  );
};
