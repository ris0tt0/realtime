import { createSelector } from 'reselect';

const getTripEntitiesSelector = (state) => state.jbart.trip.entities;
const getTripResultSelector = (state) => state.jbart.trip.result;

export const getTripScheduleSelector = createSelector(
  [getTripEntitiesSelector, getTripResultSelector],
  (entities, result) => {
    // const request = entities.request[]
    if (!result) {
      return {};
    }
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

    return { ...result, schedule };
  }
);

export const getTripListSelector = createSelector(
  [getTripScheduleSelector],
  (result) => {
    if (result.schedule?.request?.trip) {
      return result.schedule?.request?.trip;
    }
    return [];
  }
);
