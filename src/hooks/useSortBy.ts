import { useSelector } from 'react-redux';
import { rteSelector } from '../selectors';

export const useSortBy = (id?: string) => {
  const map = useSelector(rteSelector);
  if (!id) return null;

  const rte = map[id] ?? null;
  if (!rte) return null;

  return rte.sort;
};
