import React, { FC } from 'react';
import { BartStationsETDFull } from '../../hooks/useRealTimeEstimateDetails';
import {
  ESTStyled,
  ETAStlyled,
  StationEtaContainer,
} from '../../routes/rte/stationDetails';
import { Paper } from '@mui/material';

export const RTEStationNameList: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
  const etd =
    station.etd?.map(({ destination, estimate }) => {
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
          <div>{destination}</div>
          <ETAStlyled> {eta}</ETAStlyled>
        </StationEtaContainer>
      );
    }) ?? null;

  return <Paper>{etd}</Paper>;
};
