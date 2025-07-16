import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';
import { RTEStationSelect } from '../../containers/rte/listSelection';
import { RTEStationUpdated } from '../../containers/rte/updateStation';
import { BartStaionEstimate } from '../../db';
import { BartStationsETDFull } from '../../hooks/useRealTimeEstimateDetails';
import { useSortBy } from '../../hooks/useSortBy';

export const ETAStlyled = styled('div')`
  display: flex;
`;

export const ESTStyled = styled('div')<{ bartColor: string }>((props) => {
  return {
    display: 'flex',
    gap: '0.5rem',
    padding: '5px 10px',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: props.bartColor,
  };
});

const StationEtaContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const StationPlatformEtaContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
`;

const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlatformHader = styled('h4')`
  margin-bottom: 0px;
`;

export const RTENameList: FC<{ station: BartStationsETDFull }> = ({
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

  return <>{etd}</>;
};

export const RTEProfileList: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
  const platforms =
    station.etd?.reduce(
      (retVal, etd) => {
        etd.estimate.forEach((est) => {
          if (!retVal[est.platform]) {
            retVal[est.platform] = {};
          }
          if (!retVal[est.platform][etd.destination]) {
            retVal[est.platform][etd.destination] = [];
          }
          retVal[est.platform][etd.destination].push(est);
        });

        return retVal;
      },
      {} as Record<string, Record<string, BartStaionEstimate[]>>,
    ) ?? {};

  const items = Object.entries(platforms).map(([platformName, station]) => {
    const stations = Object.entries(station).map(([destination, est]) => {
      const eta = est.map((est: BartStaionEstimate) => {
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
        <StationPlatformEtaContainer key={destination}>
          <div>{destination}</div>
          <ETAStlyled> {eta}</ETAStlyled>
        </StationPlatformEtaContainer>
      );
    });

    return (
      <div>
        <PlatformHader>Platform {platformName}</PlatformHader>
        <div>{stations}</div>
      </div>
    );
  });

  return <>{items}</>;
};

export const RTEStationDetail: FC<{ station: BartStationsETDFull }> = ({
  station,
}) => {
  const sort = useSortBy();

  return (
    <div>
      <HeaderContainer>
        <h2>{station.name}</h2>
        <RTEStationUpdated />
      </HeaderContainer>
      <div>
        <RTEStationSelect />
        {sort === 'name' ? (
          <RTENameList station={station} />
        ) : (
          <RTEProfileList station={station} />
        )}
      </div>
    </div>
  );
};
