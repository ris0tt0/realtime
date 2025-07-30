import React, { FC } from 'react';
import { BartStationsETDFull } from '../../hooks/useRealTimeEstimates';
import {
  ESTStyled,
  ETAStlyled,
  StationEtaContainer,
} from '../../routes/rte/stationDetails';
import { Paper } from '@mui/material';
import { LinkStyled } from '../../routes/styled';

export const RTEStationNameList: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
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
            <span>({est.length} car)</span>
          </ESTStyled>
        );
      });
      return (
        <StationEtaContainer key={destination}>
          <LinkStyled to={`/stations/${abbreviation}`}>
            {destination}
          </LinkStyled>
          <ETAStlyled> {eta}</ETAStlyled>
        </StationEtaContainer>
      );
    }) ?? null;

  return <Paper>{etd}</Paper>;
};
