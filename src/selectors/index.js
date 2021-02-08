import Logger from 'js-logger';
import { createSelector } from 'reselect';
import { getTimeFromBartResponse } from '../utils/date';

export const getAppDataIsRequesting = (state) => state.AppData.isRequesting;
export const getAppDataIsInitLoaded = (state) => state.AppData.isInitLoaded;
export const getAppDataIsInitLoadError = (state) => state.AppData.error;

const getTrainCountSelector = (state) => state.traincount.entities.traincount;
const getTrainCountResultSelector = (state) => state.traincount.result;

export const getTrainCountData = createSelector(
  [getTrainCountSelector, getTrainCountResultSelector],
  (traincount, result) => traincount[result]
);
export const getTrainCountNumber = createSelector(
  [getTrainCountData],
  (data) => data.traincount
);

const getStationsSelector = (state) => state.Stations.entities.stations;
const getStationsResultSelector = (state) => state.Stations.result;
export const getStations = createSelector(
  [getStationsSelector, getStationsResultSelector],
  (data, stationIds) => stationIds.map((name) => data[name])
);

const getRealTimeDeparturesEntitiesEstimateSelector = (state) =>
  state.RealTimeEstimates.entities.estimate;
const getRealTimeDeparturesEntitiesEtdSelector = (state) =>
  state.RealTimeEstimates.entities.etd;
const getRealTimeDeparturesEntitiesResponseSelector = (state) =>
  state.RealTimeEstimates.entities.response;
const getRealTimeDeparturesResultSelector = (state) =>
  state.RealTimeEstimates.result;
export const getRealTimeEstimatesIsRequesting = (state) =>
  state.RealTimeEstimates.isRequesting;
export const getRealTimeEstimatesErrorSelector = (state) =>
  state.RealTimeEstimates.error;

export const getRealTimeEstimateResultStationSelector = createSelector(
  [
    getRealTimeDeparturesResultSelector,
    getRealTimeDeparturesEntitiesResponseSelector,
    getStationsSelector,
  ],
  (results = '', response = {}, station = {}) => {
    if (response[results]?.station?.length) {
      const abbr = response[results].station[0];
      return station[abbr];
    }
    return null;
  }
);
export const getRealTimeEstimatesResultDateSelector = createSelector(
  [
    getRealTimeDeparturesResultSelector,
    getRealTimeDeparturesEntitiesResponseSelector,
  ],
  (results = '', response = {}) => {
    if (response[results] && response[results].date && response[results].time) {
      const { time, date } = response[results];

      const retVal = getTimeFromBartResponse(time, new Date(date));

      return retVal;
    }
    return '';
  }
);
export const getRealTimeEstimatesResultMapSelector = createSelector(
  [
    getRealTimeDeparturesEntitiesEstimateSelector,
    getRealTimeDeparturesEntitiesEtdSelector,
    getStationsSelector,
  ],
  (estimate = {}, etd = {}, station = {}) => {
    return Object.values(etd).reduce((map, item) => {
      item.estimate.forEach((id) => {
        const est = estimate[id];
        if (!map.has(est.platform)) {
          map.set(est.platform, new Map());
        }
        if (!map.get(est.platform).has(item.abbreviation)) {
          map.get(est.platform).set(item.abbreviation, {
            destination: station[item.abbreviation],
            estimate: [],
          });
        }
        map.get(est.platform).get(item.abbreviation).estimate.push(est);
      });
      return map;
    }, new Map());
  }
);

export const getTripPlanningIsRequestingSelector = (state) =>
  state.TripPlanning.isRequesting;

export const getTripPlanningErrorSelector = (state) => state.TripPlanning.error;
const getTripPlanningResultSelector = (state) => state.TripPlanning.result;
const getTripPlanningEntitiesSelector = (state) => state.TripPlanning.entities;

export const getTripPlanningCurrentResultSelector = createSelector(
  [
    getStationsSelector,
    getTripPlanningResultSelector,
    getTripPlanningEntitiesSelector,
  ],
  (stations, result, entities) => {
    if (entities.response) {
      const response = entities.response[result];
      const schedule = entities.schedule[response.schedule];
      const request = entities.request[schedule.request];
      const date = getTimeFromBartResponse(
        schedule.time,
        new Date(schedule.date)
      );
      const destination = stations[response.destination];
      const origin = stations[response.origin];
      const trip = request.trip.map((id) => {
        const retVal = entities.trip[id];
        const fares = entities.fares[retVal.fares].fare.map(
          (id) => entities.fare[id]
        );
        const destDate = getTimeFromBartResponse(
          retVal.destTimeMin,
          new Date(retVal.destTimeDate)
        );
        const origDate = getTimeFromBartResponse(
          retVal.origTimeMin,
          new Date(retVal.origTimeDate)
        );
        const destination = stations[retVal.destination];
        const origin = stations[retVal.origin];
        const leg = retVal.leg.map((id) => {
          const retVal = entities.leg[id];

          const destDate = getTimeFromBartResponse(
            retVal.destTimeMin,
            new Date(retVal.destTimeDate)
          );
          const origDate = getTimeFromBartResponse(
            retVal.origTimeMin,
            new Date(retVal.origTimeDate)
          );
          const destination = stations[retVal.destination];
          const origin = stations[retVal.origin];

          return { ...retVal, destDate, origDate, destination, origin };
        });
        return {
          ...retVal,
          fares,
          leg,
          origin,
          destination,
          origDate,
          destDate,
        };
      });

      return {
        ...response,
        destination,
        origin,
        schedule: { ...schedule, date, request: { ...request, trip } },
      };
    }

    return null;
  }
);
