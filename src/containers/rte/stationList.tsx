import { Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { BartStationsETDFull } from '../../db';
import {
  ESTStyled,
  ETAStyledContainer,
  StationEtaContainer,
} from '../../routes/rte/stationDetails';
import { LinkStyled } from '../../routes/styled';

export const NoDepartureStyled = styled('div')(
  ({ theme }) => `
  display: flex;
  background: ${theme.palette.background.paper}
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`,
);

export const RTEStationNameList: FC<{
  station: BartStationsETDFull;
  compact?: boolean;
}> = ({ station, compact = false }) => {
  const etd =
    station.etd?.map(({ abbreviation, destination, estimate }) => {
      const eta = estimate.map((est) => {
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
          <LinkStyled to={`/stations/${abbreviation}`}>
            {destination}
          </LinkStyled>
          <ETAStyledContainer> {eta}</ETAStyledContainer>
        </StationEtaContainer>
      );
    }) ?? null;

  if (!etd) {
    return <NoDepartureStyled>No departures scheduled</NoDepartureStyled>;
  }

  return <Stack sx={{ width: '100%' }}>{etd}</Stack>;
};
