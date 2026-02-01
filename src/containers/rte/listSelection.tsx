import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC } from 'react';
import { RealTimeEstimates, SortStationsBy } from '../../db';
import { useRteDispatch } from '../../store';
import { setRte } from '../../store/rte';

const SortStationsContainer = styled(FormControl)(({ theme }) => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    paddingBottom: '1rem',
  };
});

export const RTEStationSelect: FC<{ rte: RealTimeEstimates }> = ({ rte }) => {
  const dispatch = useRteDispatch();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sort = event.target.value as SortStationsBy;
    const result = { ...rte, sort };
    dispatch(setRte(result));
  };

  return (
    <SortStationsContainer>
      <FormLabel id="sort-station-radio-buttons-group-label">
        {sm ? 'Sort by:' : 'Sort Stations by:'}
      </FormLabel>
      <RadioGroup
        aria-labelledby="sort-station-radio-buttons-group-label"
        defaultValue="name"
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
