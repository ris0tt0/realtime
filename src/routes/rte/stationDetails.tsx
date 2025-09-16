import { styled } from '@mui/material';
import React, { FC } from 'react';
import { RTEStationSelect } from '../../containers/rte/listSelection';
import { RTEPlatformList } from '../../containers/rte/platformList';
import { RTEStationNameList } from '../../containers/rte/stationList';
import { RTEStationUpdated } from '../../containers/rte/updateStation';
import { BartStationsETDFull, RealTimeEstimaates } from '../../db';
import Logger from 'js-logger';
import { BackgroundPaperContainer } from '../../styled';

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

export const StationEtaContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const RTEStationDetail: FC<{
  rte: RealTimeEstimaates;
}> = ({ rte }) => {
  Logger.info('rtestationdetail', rte);
  return (
    <div>
      <HeaderContainer>
        <h2>{rte.data.name}</h2>
        <RTEStationUpdated />
      </HeaderContainer>
      <div>
        <RTEStationSelect rte={rte} />
        {rte.sort === 'name' ? (
          <BackgroundPaperContainer sx={{ padding: '0px 1rem' }}>
            <RTEStationNameList station={rte.data} />
          </BackgroundPaperContainer>
        ) : (
          <BackgroundPaperContainer sx={{ padding: '0px 1rem' }}>
            <RTEPlatformList station={rte.data} />
          </BackgroundPaperContainer>
        )}
      </div>
    </div>
  );
};
