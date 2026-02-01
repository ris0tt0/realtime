import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { rteSelector } from '../selectors';

export const useRteMap = () => {
  const map = useSelector(rteSelector);
  return map;
};

export const useRte = (id?: string) => {
  const map = useRteMap();

  const result = useMemo(() => {
    if (!id) return null;
    return map[id];
  }, [id, map]);

  return result;
};
