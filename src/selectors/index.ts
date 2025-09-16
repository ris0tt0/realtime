import { createSelector } from 'reselect';
import { RteState } from '../store/rte';

export const trainsInServiceSelector = (state: RteState) =>
  state.totalTrainsInService;

export const routesSelector = (state: RteState) => state.routes;

export const routesListSelector = createSelector([routesSelector], (routes) => {
  const list = Array.from(Object.values(routes));
  return list;
});
export const stationsSelector = (state: RteState) => state.stations;

export const stationsListSelector = createSelector(
  [stationsSelector],
  (stations) => {
    const list = Array.from(Object.values(stations));
    return list;
  },
);

export const rteSelector = (state: RteState) => state.rte;

export const stationScheduleSelector = (state: RteState) =>
  state.stationSchedule;
