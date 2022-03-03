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
      const fares = entities.fares[entities.trip[id].fares].fare.map((id) => {
        return entities.fare[id];
      });

      const leg = entities.trip[id].leg.map((id) => {
        return entities.leg[id];
      });

      return { ...entities.trip[id], leg, fares };
    });
    const request = {
      ...entities.request[entities.schedule[result.schedule].request],
      trip,
    };
    const schedule = { ...entities.schedule[result.schedule], request };
    // Logger.info(
    //   'asdfasdf',
    //   entities.request[entities.schedule[result.schedule].request].trip
    // );

    return { ...result, schedule };
  }
);

export const getTripListSelector = createSelector(
  [getTripScheduleSelector],
  (result) => {
    return result.schedule.request.trip;
  }
);
