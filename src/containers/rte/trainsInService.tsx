import React, { FC } from 'react';
import { useTotalTrainsInService } from '../../hooks/useTotalTrains';

export const TrainsInService: FC = () => {
  const total = useTotalTrainsInService();

  return <span>{total} trains currently in service</span>;
};
