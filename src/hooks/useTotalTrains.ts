import { useSelector } from 'react-redux';
import { trainsInServiceSelector } from '../selectors';

export const useTotalTrainsInService = () => {
  const total = useSelector(trainsInServiceSelector);
  return total;
};
