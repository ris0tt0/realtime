import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';
import { BartStaionEstimate } from '../../db';
import { BartStationsETDFull } from '../../hooks/useRealTimeEstimates';
import {
  ESTStyled,
  ETAStlyled,
  StationEtaContainer,
} from '../../routes/rte/stationDetails';
import { LinkStyled } from '../../routes/styled';

const PlatformTitleHeader = styled('h4')`
  margin: 0px;
  font-weight: bold;
`;

const StationsEtdContainer = styled('div')`
  margin-left: 1rem;
`;

const PlatformsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RTEPlatformList: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
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
        Record<string, { abbr: string; est: BartStaionEstimate[] }>
      >,
    ) ?? {};

  const items = Object.entries(platforms).map(([platformName, station]) => {
    const stations = Object.entries(station).map(([destination, station]) => {
      const eta = station.est.map((est: BartStaionEstimate) => {
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
            <span>({est.length} car)</span>
          </ESTStyled>
        );
      });

      return (
        <StationEtaContainer key={destination}>
          <LinkStyled to={`/stations/${station.abbr}`}>
            {destination}
          </LinkStyled>
          <ETAStlyled>{eta}</ETAStlyled>
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

  return <PlatformsContainer>{items}</PlatformsContainer>;
};
