import { useRTAppStore } from '../store/useRTAppStore';

export const useTotalTrainsInService = () => {
  const total = useRTAppStore((state) => state.totalTrainsInService);
  return total;
};

export const useSetTotalTrainsInService = () => {
  const setTrains = useRTAppStore((state) => state.setTotalTrainsInService);
  return setTrains;
};
