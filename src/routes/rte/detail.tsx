import { styled } from '@mui/material';
import React, { FC } from 'react';
import {
  BartStationsETDFull,
  useRTEDetail,
} from './hooks/useRealTimeEstimateDetails';
import { ESTStyled, ETAStlyled } from './styled';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';

const HeaderStyled = styled('h3')`
  margin-bottom: 0;
`;

const ESTTrainSizeStyled = styled('div')`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RTEStationDetail: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
  const etd =
    station.etd?.map((etd) => {
      const destination = etd.destination;
      const eta = etd.estimate.map((est) => {
        const minutes =
          est.minutes.toLowerCase() === 'leaving'
            ? 'Leaving'
            : `${est.minutes} min`;
        return (
          <ESTStyled key={est.minutes} bartColor={est.hexcolor}>
            {minutes}
            <ESTTrainSizeStyled>
              <DirectionsRailwayIcon fontSize="small" />
              {est.length}
            </ESTTrainSizeStyled>
          </ESTStyled>
        );
      });
      return (
        <div key={destination}>
          <HeaderStyled>{destination}</HeaderStyled>
          <ETAStlyled> {eta}</ETAStlyled>
        </div>
      );
    }) ?? null;

  return (
    <div>
      <h2>{station.name}</h2>
      {etd}
    </div>
  );
};

export const RTEDetail: FC = () => {
  const data = useRTEDetail();

  if (data === null) {
    return null;
  }

  const result =
    data.map((station) => {
      return <RTEStationDetail key={station.abbr} station={station} />;
    }) ?? null;

  return <> {result}</>;
};
