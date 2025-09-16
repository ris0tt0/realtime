import { useSelector } from 'react-redux';
import { rteSelector } from '../selectors';

export const useRteMap = () => {
  const map = useSelector(rteSelector);
  return map;
};

export const useRte = (id?: string) => {
  if (!id) return null;

  const map = useRteMap();
  const result = map[id] ?? null;

  return result;
};
