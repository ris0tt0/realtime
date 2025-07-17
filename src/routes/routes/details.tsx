import { styled } from '@mui/material';
import Logger from 'js-logger';
import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RoutesParams } from '..';
import { BartRouteDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { useStationsMap } from '../../hooks/useStations';
import { Loading } from '../styled/loading';

const LinkStyled = styled(Link)`
  color: inherit;
`;

const BartLinesList = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const BartLineContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const BartLine = styled('div')<{ bartColor: string }>((props) => {
  return {
    display: 'flex',
    width: '0.25rem',
    backgroundColor: props.bartColor,
  };
});

const BartlinesListItem = styled('li')``;

const BartLines: FC<{ color: string; stations: string[] }> = ({
  color,
  stations,
}) => {
  const stationsMap = useStationsMap();

  const items = stations.map((abbr) => {
    const station = stationsMap[abbr];

    return (
      <BartlinesListItem key={abbr}>
        <LinkStyled to={`/stations/${station.abbr}`}>{station.name}</LinkStyled>
      </BartlinesListItem>
    );
  });

  return (
    <BartLineContainer>
      <BartLine bartColor={color} />
      <BartLinesList>{items}</BartLinesList>
    </BartLineContainer>
  );
};

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

  if (!routeData) {
    return <div>No route data found.</div>;
  }
  Logger.info('RouteDetails', routeData);

  return (
    <div>
      <h3>{routeData.name}</h3>
      <div>Route {routeData.number}</div>
      <div>Total stations {routeData.num_stns}</div>
      <BartLines
        color={routeData.hexcolor}
        stations={routeData.config.station}
      />
    </div>
  );
};
