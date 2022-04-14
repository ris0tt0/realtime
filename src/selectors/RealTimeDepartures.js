import Logger from 'js-logger';
import { createSelector } from 'reselect';
import { getDateTime } from '../utils';

const resultSelector = (state) => state.jbart.etd.result;
const rtdEntitiesSelector = (state) => state.jbart.etd.entities;

export const getRTDCurrentAbbrSelector = createSelector(
  [resultSelector, rtdEntitiesSelector],
  (results, entities) => {
    if (entities?.station[results?.station[0]].abbr) {
      return entities?.station[results?.station[0]].abbr;
    }
    return '';
  }
);

export const getRTDDateSelector = createSelector(
  [resultSelector],
  (results) => {
    if (results?.date) {
      const date = getDateTime(results.time, new Date(results.date));
      return date;
    }
    return null;
  }
);

export const getRTDMessageSelector = createSelector(
  [resultSelector],
  (results) => {
    return results?.message?.warning;
  }
);

export const realTimeDeparturesListSelector = createSelector(
  [resultSelector, rtdEntitiesSelector],
  (results, entities) => {
    if (results) {
      return results?.station.map((stationId) => {
        // entities.station[stationId].abbr;
        // entities.station[stationId].name;
        const etd = entities.station[stationId]?.etd?.map((etdId) => {
          // entities.estimatedTimeDepature[etdId].abbreviation;
          // entities.estimatedTimeDepature[etdId].destination;
          // entities.estimatedTimeDepature[etdId].limited;

          const estimate = entities.estimatedTimeDepature[etdId]?.estimate?.map(
            (estimateId) => {
              // entities.estimate[estimateId].bikeflag;
              // entities.estimate[estimateId].color;
              // entities.estimate[estimateId].delay;
              // entities.estimate[estimateId].direction;
              // entities.estimate[estimateId].hexcolor;
              // entities.estimate[estimateId].length;
              // entities.estimate[estimateId].minutes;
              // entities.estimate[estimateId].platform;

              return { ...entities.estimate[estimateId] };
            }
          );
          return { ...entities.estimatedTimeDepature[etdId], estimate };
        });
        return { ...entities.station[stationId], etd };
      });
    }
    return [];
  }
);
