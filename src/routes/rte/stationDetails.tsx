import { styled, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { RTEStationSelect } from '../../containers/rte/listSelection';
import { RTEPlatformList } from '../../containers/rte/platformList';
import { RTEStationNameList } from '../../containers/rte/stationList';
import { RTEStationUpdated } from '../../containers/rte/updateStation';
import { RealTimeEstimates } from '../../db';
import { flexDirection } from '@mui/system';

export const ETAStyledContainer = styled('div')`
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

export const StationEtaContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`,
);

const HeaderContainer = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    justifyContent: 'space-between',
    alignItems: 'baseline',
  };
});

const ListContainer = styled('section')`
  margin-bottom: 1rem;
`;

export const RTEStationDetail: FC<{
  rte: RealTimeEstimates;
}> = ({ rte }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderContainer>
        <h2>{rte.data.name}</h2>
        <RTEStationUpdated />
      </HeaderContainer>
      <ListContainer>
        <RTEStationSelect rte={rte} />
        {rte.sort === 'name' ? (
          <RTEStationNameList compact={matches} station={rte.data} />
        ) : (
          <RTEPlatformList compact={matches} station={rte.data} />
        )}
      </ListContainer>
    </>
  );
};
