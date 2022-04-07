import { createSelector } from 'reselect';

const getStationsEntityListSelector = (state) => state.jbart.stns.entities;

const getStationsListResultSelector = (state) => state.jbart.stns.result;

export const getStationsListSelector = createSelector(
  [getStationsEntityListSelector, getStationsListResultSelector],
  (entities, result) => {
    if (entities?.stations[result?.stations]) {
      return entities?.stations[result?.stations];
    }
    return [];
  }
);

export const getStationsMapSelector = createSelector(
  [getStationsListSelector],
  (list) => {
    if (list) {
      return list?.reduce((map, station) => {
        map.set(station.abbr, station);
        return map;
      }, new Map());
    }
    return new Map();
  }
);
