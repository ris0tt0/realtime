import { createSelector } from 'reselect';

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

const getRealTimeDeparturesResponseSelector = (state) =>
  state.rtd.entities.response;
const getRealTimeDeparturesStationSelector = (state) =>
  state.rtd.entities.station;
const getRealTimeDeparturesETDSelector = (state) => state.rtd.entities.etd;
const getRealTimeDeparturesEstimateSelector = (state) =>
  state.rtd.entities.estimate;
const getRealTimeDeparturesResultSelector = (state) => state.rtd.result;

export const getRealTimeDeparturesStationResponse = createSelector(
  [getRealTimeDeparturesResponseSelector, getRealTimeDeparturesResultSelector],
  (data, result) => data[result]
);

export const getRealTimeDeparturesStationId = createSelector(
  [getRealTimeDeparturesStationResponse],
  (response) => response.station
);

export const getRealTimeDeparturesStation = createSelector(
  [getRealTimeDeparturesStationId, getRealTimeDeparturesStationSelector],
  (stationId, station) => station[stationId]
);

export const getRealTimeDeparturesStationName = createSelector(
  [getRealTimeDeparturesStation],
  (station) => station.name
);

export const getRealTimeDeparturesStationTime = createSelector(
  [getRealTimeDeparturesStationResponse],
  (response) => response.time
);

export const getRealTimeStationArray = createSelector(
  [
    getRealTimeDeparturesStation,
    getRealTimeDeparturesEstimateSelector,
    getRealTimeDeparturesETDSelector,
  ],
  (station, est, etd) => {
    const stations = station.etd.map((key) => {
      const des = etd[key];
      const estimate = des.estimate
        ? des.estimate.map((item) => est[item])
        : [];
      return { ...des, estimate };
    });

    return stations;
  }
);

export const getRealTimeStationPlatformMap = createSelector(
  [
    getRealTimeDeparturesStation,
    getRealTimeDeparturesEstimateSelector,
    getRealTimeDeparturesETDSelector,
  ],
  (station, estimate, etdSelectorResult) => {
    const map = new Map();

    station.etd.forEach((key) => {
      const etd = etdSelectorResult[key];
      const est = etd.estimate
        ? etd.estimate.map((item) => estimate[item])
        : [];

      est.forEach((estimate) => {
        // make sure we have a map for each platform
        if (!map.has(estimate.platform)) map.set(estimate.platform, new Map());
        // map with abbr key and [estimate]
        if (!map.get(estimate.platform).has(etd.abbreviation))
          map.get(estimate.platform).set(etd.abbreviation, {
            ...etd,
            estimate: [],
          });
        // add the estimate data to the object
        map
          .get(estimate.platform)
          .get(etd.abbreviation)
          .estimate.push({ ...estimate });
      });
    });
    // sort by platform number
    return new Map([...map.entries()].sort());
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
