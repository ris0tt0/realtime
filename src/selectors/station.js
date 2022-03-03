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

export const getStationsMapSelector = createSelector(
  [getStationsListSelector],
  (list) => {
    return list.reduce((map, station, index) => {
      map.set(station.abbr, station);
      return map;
    }, new Map());
    // return stations[result.stations];
  }
);
