import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { BartStationEstimate, BartStationsETDFull } from '../../db';
import {
  ESTStyled,
  ETAStyledContainer,
  StationEtaContainer,
} from '../../routes/rte/stationDetails';
import { LinkStyled } from '../../routes/styled';
import { NoDepartureStyled } from './stationList';

const PlatformTitleHeader = styled('h4')`
  margin: 0px;
  font-weight: bold;
`;

const StationsEtdContainer = styled('div')`
  margin-left: 1rem;
`;

export const RTEPlatformList: FC<{
  station: BartStationsETDFull;
  compact?: boolean;
}> = ({ station, compact }) => {
  const platforms =
    station.etd?.reduce(
      (retVal, etd) => {
        etd.estimate.forEach((est) => {
          //by platform
          if (!retVal[est.platform]) {
            retVal[est.platform] = {};
          }
          //by destination
          if (!retVal[est.platform][etd.destination]) {
            retVal[est.platform][etd.destination] = {
              abbr: etd.abbreviation,
              est: [],
            };
          }
          retVal[est.platform][etd.destination].est.push(est);
        });

        return retVal;
      },
      {} as Record<
        string,
        Record<string, { abbr: string; est: BartStationEstimate[] }>
      >,
    ) ?? {};

  const items = Object.entries(platforms).map(([platformName, station]) => {
    const stations = Object.entries(station).map(([destination, station]) => {
      const eta = station.est.map((est: BartStationEstimate) => {
        const minutes =
          est.minutes.toLowerCase() === 'leaving'
            ? 'Leaving'
            : `${est.minutes} min`;
        return (
          <ESTStyled
            key={`${est.minutes}-${est.hexcolor}`}
            bartColor={est.hexcolor}
          >
            <span>{minutes}</span>
            {compact ? null : <span>({est.length} car)</span>}
          </ESTStyled>
        );
      });

      return (
        <StationEtaContainer key={destination}>
          <LinkStyled to={`/stations/${station.abbr}`}>
            {destination}
          </LinkStyled>
          <ETAStyledContainer>{eta}</ETAStyledContainer>
        </StationEtaContainer>
      );
    });

    return (
      <div key={platformName}>
        <PlatformTitleHeader>Platform {platformName}</PlatformTitleHeader>
        <StationsEtdContainer>{stations}</StationsEtdContainer>
      </div>
    );
  });

  if (items.length < 1) {
    return <NoDepartureStyled>No departures scheduled</NoDepartureStyled>;
  }

  return (
    <Stack sx={{ backgroundColor: `background.paper`, padding: '0.5rem' }}>
      {items}
    </Stack>
  );
};
