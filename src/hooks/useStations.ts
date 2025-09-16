import { useSelector } from 'react-redux';
import { stationsListSelector, stationsSelector } from '../selectors';

export const useStations = () => {
  const stations = useSelector(stationsListSelector);

  return stations;
};

export const useStationsMap = () => {
  const stations = useSelector(stationsSelector);

  return stations;
};
