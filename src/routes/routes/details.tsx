import { Box, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoutesParams } from '..';
import { BartRouteDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { useStationsMap } from '../../hooks/useStations';
import { LinkStyled } from '../styled';
import { Loading } from '../styled/loading';

const BartLinesList = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const BartLineContainer = styled('div')`
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

export const BartLine = styled('div')<{ bartColor: string }>((props) => {
  return {
    display: 'flex',
    width: '0.25rem',
    margin: '0.75rem 0.5rem',
    backgroundColor: props.bartColor,
  };
});

const BartLineInfo = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const BartLines: FC<{ color: string; stations: string[] }> = ({
  color,
  stations,
}) => {
  const stationsMap = useStationsMap();

  const items = stations.map((abbr) => {
    const station = stationsMap[abbr];

    return (
      <li key={abbr}>
        <LinkStyled to={`/stations/${station.abbr}`}>{station.name}</LinkStyled>
      </li>
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
    return <div>No route data found 😔</div>;
  }

  return (
    <section>
      <h2>{routeData.name}</h2>
      <Box sx={{ width: '300px' }}>
        <BartLineInfo>
          <div>Route {routeData.number} </div>
          <div>total stations {routeData.num_stns}</div>
        </BartLineInfo>
        <BartLines
          color={routeData.hexcolor}
          stations={routeData.config.station}
        />
      </Box>
    </section>
  );
};
