import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import React, { FC } from 'react';
import { useSetSortBy, useSortBy } from '../../hooks/useSortBy';
import { SortStationsBy } from '../../store/useRTAppStore';

const SortStationsContainer = styled(FormControl)`
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 1rem;
`;

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
