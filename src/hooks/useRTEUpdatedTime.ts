import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { rteSelector } from '../selectors';

export const useRteUpdatedTime = (id?: string) => {
  const map = useSelector(rteSelector);

  const date = useMemo(() => {
    if (!id) return null;
    const rte = map[id];
    if (!rte) return null;

    return new Date(rte.update);
  }, [id, map]);

  return date;
};
