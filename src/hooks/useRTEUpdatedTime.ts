import { useSelector } from 'react-redux';
import { rteSelector } from '../selectors';

export const useRteUpdatedTime = (id?: string) => {
  const map = useSelector(rteSelector);
  if (!id) return null;

  const rte = map[id];

  if (!rte) return null;

  const date = new Date(rte.update);

  return date;
};
