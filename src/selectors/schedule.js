import Logger from 'js-logger';
import { createSelector } from 'reselect';

const getTripEntitiesSelector = (state) => state.jbart.trip.entities;
const getTripEntityScheduleSelector = (state) =>
  state.jbart.trip.entities.schedule;
const getTripResultSelector = (state) => state.jbart.trip.result;

export const getTripScheduleSelector = createSelector(
  [getTripEntitiesSelector, getTripResultSelector],
  (entities, result) => {
    // const request = entities.request[]
    const trip = entities.request[
      entities.schedule[result.schedule].request
    ].trip.map((id) => {
      const fares = entities.fares[entities.trip[id].fares];
      return { ...entities.trip[id], fares };
    });
    const request = {
      ...entities.request[entities.schedule[result.schedule].request],
      trip,
    };
    const schedule = { ...entities.schedule[result.schedule], request };
    Logger.info(
      'asdfasdf',
      entities.request[entities.schedule[result.schedule].request].trip
    );

    return { ...result, schedule };
  }
);
