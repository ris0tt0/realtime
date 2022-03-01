import { createSelector } from 'reselect';

const getStationsEntityStationsListSelector = (state) =>
  state.jbart.stns.entities.stations;

const getStationsListResultSelector = (state) => state.jbart.stns.result;

export const getStationsListSelector = createSelector(
  [getStationsEntityStationsListSelector, getStationsListResultSelector],
  (stations, result) => {
    return stations[result.stations];
  }
);
