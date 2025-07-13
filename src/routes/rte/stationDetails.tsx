import { Refresh } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { useCommands } from '../../hooks/useCommands';
import { BartStationsETDFull } from '../../hooks/useRealTimeEstimateDetails';
import { useSetSortBy, useSortBy } from '../../hooks/useSortBy';
import { SortStationsBy } from '../../store/useRTAppStore';
import { useParams } from 'react-router-dom';
import { StationsParams } from '..';

export const ETAStlyled = styled('div')`
  display: flex;
`;

export const ESTStyled = styled('div')<{ bartColor: string }>((props) => {
  return {
    display: 'flex',
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

const HeaderContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SortStationsContainer = styled(FormControl)`
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 1rem;
`;

export const RTEStationUpdated: FC = () => {
  const commands = useCommands();
  const { stationId } = useParams<StationsParams>();

  const handleClick = () => {
    Logger.info('Refreshing station details', stationId);
  };
  return (
    <span>
      <span>Updated 5:09pm</span>
      <IconButton onClick={handleClick}>
        <Refresh />
      </IconButton>
    </span>
  );
};

export const RTEStationSelect: FC = () => {
  const sort = useSortBy();
  const setSortBy = useSetSortBy();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as SortStationsBy;
    setSortBy(value);
  };

  return (
    <SortStationsContainer>
      <FormLabel id="sort-station-radio-buttons-group-label">
        Sort Stations by
      </FormLabel>
      <RadioGroup
        aria-labelledby="sort-station-radio-buttons-group-label"
        defaultValue="female"
        name="sort-station-radio-buttons-group"
        row
        value={sort}
        onChange={handleChange}
      >
        <FormControlLabel value="name" control={<Radio />} label="Name" />
        <FormControlLabel
          value="platform"
          control={<Radio />}
          label="Platform"
        />
      </RadioGroup>
    </SortStationsContainer>
  );
};

export const RTEStationDetail: FC<{ station: BartStationsETDFull }> = ({
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
          <ESTStyled key={est.minutes} bartColor={est.hexcolor}>
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

  return (
    <Paper>
      <HeaderContainer>
        <h2>{station.name}</h2>
        <RTEStationUpdated />
      </HeaderContainer>
      <div>
        <RTEStationSelect />
        {etd}
      </div>
    </Paper>
  );
};
