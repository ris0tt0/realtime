import Logger from 'js-logger';
import { createSelector } from 'reselect';
import { getTimeFromBartResponse } from '../utils/date';

export const getAppDataIsRequesting = (state) => state.AppData.isRequesting;
export const getAppDataIsInitLoaded = (state) => state.AppData.isInitLoaded;
export const getAppDataIsInitLoadError = (state) => state.AppData.error;

const getRoutesSelector = (state) => state.routes.entities.route;
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

const getRealTimeDeparturesEntitiesSelector = (state) =>
  state.RealTimeEstimates.entities;
const getRealTimeDeparturesEntitiesEstimateSelector = (state) =>
  state.RealTimeEstimates.entities.estimate;
const getRealTimeDeparturesEntitiesEtdSelector = (state) =>
  state.RealTimeEstimates.entities.etd;
const getRealTimeDeparturesEntitiesStationSelector = (state) =>
  state.RealTimeEstimates.entities.station;
const getRealTimeDeparturesEntitiesResponseSelector = (state) =>
  state.RealTimeEstimates.entities.response;
const getRealTimeDeparturesResultSelector = (state) =>
  state.RealTimeEstimates.result;
export const getRealTimeEstimatesIsRequesting = (state) =>
  state.RealTimeEstimates.isRequesting;
export const getRealTimeEstimatesErrorSelector = (state) =>
  state.RealTimeEstimates.error;
/**
 * TODO: finish data
 */
export const getRealTimeEstimatesResultDateSelector = createSelector(
  [
    getRealTimeDeparturesResultSelector,
    getRealTimeDeparturesEntitiesResponseSelector,
  ],
  (results = '', response = {}) => {
    if (response[results] && response[results].date && response[results].time) {
      const { time, date } = response[results];
      const retVal = new Date(date);

      const timestring = getTimeFromBartResponse(time);

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

const getTripPlannerResponseSelector = (state) =>
  state.tripplanner.entities.response;
const getTripPlannerScheduleSelector = (state) =>
  state.tripplanner.entities.schedule;
const getTripPlannerRequestSelector = (state) =>
  state.tripplanner.entities.request;
const getTripPlannerLegSelector = (state) => state.tripplanner.entities.leg;
const getTripPlannerFaresSelector = (state) => state.tripplanner.entities.fares;
const getTripPlannerTripSelector = (state) => state.tripplanner.entities.trip;
const getTripPlannerResultSelector = (state) => state.tripplanner.result;
const getTripPlannerDetailsIdSelector = (state) => state.tripPlannerDetailsId;

const getTripPlannerDestinationAbbrSelector = (state) => state.destinationAbbr;
const getTripPlannerStartingAbbrSelector = (state) => state.startingAbbr;

export const getHasDestinationStartingAbbr = createSelector(
  [getTripPlannerStartingAbbrSelector, getTripPlannerDestinationAbbrSelector],
  (staringAhbr, destinationAbbr) =>
    staringAhbr.length > 0 && destinationAbbr.length > 0
);

export const getHasTripPlannerDetailsDetailsId = createSelector(
  [getTripPlannerDetailsIdSelector],
  (id) => id !== 'tripId'
);
export const getTripPlannerDetails = createSelector(
  [getTripPlannerDetailsIdSelector, getTripPlannerTripSelector],
  (id, trip) => {
    return { ...trip[id] };
  }
);

export const getTripPlanner = createSelector(
  [getTripPlannerResponseSelector, getTripPlannerResultSelector],
  (response, result) => response[result]
);

export const getTripPlannerSchedule = createSelector(
  [getTripPlanner, getTripPlannerScheduleSelector],
  (tripPlanner, schedule) => schedule[tripPlanner.schedule]
);

export const getTripPlannerRequest = createSelector(
  [getTripPlannerRequestSelector, getTripPlannerSchedule],
  (request, schedule) => request[schedule.request]
);

export const getTripPlannerTrips = createSelector(
  [
    getTripPlannerRequest,
    getTripPlannerTripSelector,
    getTripPlannerLegSelector,
    getTripPlannerFaresSelector,
  ],
  (tripData, trip, legEntity, faresEntity) => {
    return tripData.trip.map((id) => {
      const item = trip[id];
      const leg = item.leg.map((key) => legEntity[key]);
      const fares = faresEntity[item.fares];
      const startTime = item['@origTimeMin'];
      const startTimeReal = '';
      const endTime = item['@destTimeMin'];
      const endTimeReal = '';
      const timeLength = item['@tripTime'];
      const fare = item['@fare'];
      const tripId = id;

      return {
        tripId,
        startTime,
        startTimeReal,
        endTime,
        endTimeReal,
        timeLength,
        fares,
        fare,
        leg,
      };
    });
  }
);

export const getTripPlannerTripDetails = createSelector(
  [
    getTripPlannerDetails,
    getTripPlannerLegSelector,
    getStationsSelector,
    getRoutesSelector,
  ],
  (tripData, leg, stations, routes) => {
    if (!tripData.hasOwnProperty('leg')) return {};

    const legList = tripData.leg.map((key) => {
      const data = { ...leg[key] };
      data.origin = { ...stations[data['@origin']] };
      data.destination = { ...stations[data['@destination']] };
      data.line = { ...routes[data['@line']] };

      return data;
    });

    tripData.origin = { ...stations[tripData['@origin']] };
    tripData.destination = { ...stations[tripData['@destination']] };
    tripData.line = { ...routes[tripData['@line']] };
    return { ...tripData, leg: legList };
  }
);
