import { Box, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoutesParams } from '..';
import { BartRouteDetail } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { useStationsMap } from '../../hooks/useStations';
import { LinkStyled } from '../styled';
import { Loading } from '../styled/loading';

const InfoStyled = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  };
});

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
    margin: '0.75rem 0.5rem',
    backgroundColor: props.bartColor,
  };
});

const BartLineInfo = styled('div')`
  margin-bottom: 1rem;
  div {
    display: flex;
    justify-content: space-between;
  }
  h3 {
    margin: 0 0;
  }
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
  const stationsMap = useStationsMap();
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
    return <h2>No route data found 😔</h2>;
  }

  return (
    <>
      <h2>{routeData.name}</h2>
      <Box
        component="section"
        sx={{
          maxWidth: '700px',
          padding: '0.5rem',
          backgroundColor: `background.paper`,
        }}
      >
        <BartLineInfo>
          <InfoStyled>
            <h3>Route {routeData.number}</h3>
            <h3>Direction: {routeData.direction}</h3>
            <h3>Total Stations: {routeData.num_stns}</h3>
          </InfoStyled>
          <h3>Origin Station: {stationsMap[routeData.origin].name}</h3>
          <h3>
            Destination Station: {stationsMap[routeData.destination].name}
          </h3>
        </BartLineInfo>
        <BartLines
          color={routeData.hexcolor}
          stations={routeData.config.station}
        />
      </Box>
    </>
  );
};
