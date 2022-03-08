import { createSelector } from 'reselect';

const resultSelector = (state) => state.jbart.etd.result;
const rtdEntitiesSelector = (state) => state.jbart.etd.entities;

export const getRTDCurrentAbbrSelector = createSelector(
  [resultSelector, rtdEntitiesSelector],
  (results, entities) => {
    return entities.station[results.station[0]].abbr;
  }
);

export const realTimeDeparturesListSelector = createSelector(
  [resultSelector, rtdEntitiesSelector],
  (results, entities) => {
    const retVal = results.station.map((stationId) => {
      entities.station[stationId].abbr;
      entities.station[stationId].name;
      const etd = entities.station[stationId].etd.map((etdId) => {
        // entities.estimatedTimeDepature[etdId].abbreviation;
        // entities.estimatedTimeDepature[etdId].destination;
        // entities.estimatedTimeDepature[etdId].limited;

        const estimate = entities.estimatedTimeDepature[etdId].estimate.map(
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

    return retVal;
  }
);
