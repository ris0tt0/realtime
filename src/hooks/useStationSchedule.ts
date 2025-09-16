import { useSelector } from 'react-redux';
import { stationScheduleSelector } from '../selectors';

export const useStationSchedule = (routeId: string) => {
  const scheduleMap = useSelector(stationScheduleSelector);

  const stationSchedule = scheduleMap[routeId] ?? null;

  if (!stationSchedule) return null;

  return stationSchedule;
};
