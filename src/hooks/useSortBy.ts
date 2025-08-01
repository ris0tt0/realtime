import { useRTAppStore } from '../store/useRTAppStore';

export const useSortBy = () => {
  const sort = useRTAppStore((state) => state.rteSortBy);
  return sort;
};

export const useSetSortBy = () => {
  const setSortBy = useRTAppStore((state) => state.setRteSortBy);
  return setSortBy;
};
