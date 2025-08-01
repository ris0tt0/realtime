import { useRTAppStore } from '../store/useRTAppStore';

export const useStations = () => {
  const stations = useRTAppStore((state) => state.stations);
  return stations;
};

export const useStationsMap = () => {
  const stationsMap = useRTAppStore((state) => state.stationsMap);
  return stationsMap;
};

export const useSetStations = () => {
  const stationsMap = useRTAppStore((state) => state.setStations);
  return stationsMap;
};
