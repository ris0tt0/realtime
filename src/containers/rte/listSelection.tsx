import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import React, { FC } from 'react';
import { RealTimeEstimaates, SortStationsBy } from '../../db';
import { useRteDispatch } from '../../store';
import { setRte } from '../../store/rte';

const SortStationsContainer = styled(FormControl)`
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 1rem;
`;

export const RTEStationSelect: FC<{ rte: RealTimeEstimaates }> = ({ rte }) => {
  const dispatch = useRteDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sort = event.target.value as SortStationsBy;
    const result = { ...rte, sort };
    dispatch(setRte(result));
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
        value={rte.sort}
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
