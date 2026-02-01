import React, { FC } from 'react';
import { useTotalTrainsInService } from '../../hooks/useTotalTrains';

export const TrainsInService: FC = () => {
  const total = useTotalTrainsInService();

  return <span>{`${total.toString()} trains currently in service`}</span>;
};
