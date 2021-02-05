import { normalize, schema } from 'normalizr';
import {
  normalizeAdvisories,
  normalizeElevators,
  normalizeRealTimeEstimates,
  normalizeStations,
  normalizeTrainCount,
  normalizeTripPlanning,
} from '../normalize';

export const GET_ETA = 'get eta';

export const RECEIVE_ROUTES = 'receive routes';
export const SET_STARTING_ABBR = 'set starting abbr';
export const SET_DESTINATION_ABBR = 'set destination abbr';
export const SET_TRIP_PLANNER_DETAILS = 'set trip planner details';
export const SET_TRIP_PLANNER_LEG_IDS = 'set trip planner leg ids;';
export const SHOW_SORT_SELECTION = 'show sort selection';

export function getETA(station) {
  return { type: GET_ETA, station };
}
export function receiveRoutes(routes) {
  return { type: RECEIVE_ROUTES, routes };
}
export function showSortSelection(selection) {
  return { type: SHOW_SORT_SELECTION, selection };
}
export function setStartingAbbr(abbr) {
  return { type: SET_STARTING_ABBR, abbr };
}
export function setDestinationAbbr(abbr) {
  return { type: SET_DESTINATION_ABBR, abbr };
}
export function setTripPlannerDetails(tripId) {
  return { type: SET_TRIP_PLANNER_DETAILS, tripId };
}
export function setTripPlannerLegIds(legIds) {
  return { type: SET_TRIP_PLANNER_LEG_IDS, legIds };
}

export function fetchRoutes() {
  return (dispatch, getState, { API_KEY }) => {
    return fetch(
      `http://api.bart.gov/api/route.aspx?cmd=routes&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => {
        const routeSchema = new schema.Entity('route', undefined, {
          idAttribute: (item) => item.routeID,
        });
        const routesSchema = new schema.Entity(
          'routes',
          { route: [routeSchema] },
          { idAttribute: (item) => 'id' }
        );
        const normalized = normalize(json.root.routes, routesSchema);

        dispatch(receiveRoutes(normalized));
      });
  };
}
export const REQUESTING_INITIAL_DATA = 'requesting initial data';
export const REQUESTING_INITIAL_DATA_ERROR = 'requesting initiali data error';
export const RECIEVE_INITIAL_DATA = 'recieve initial data';
export const requestingInitialData = (payload) => ({
  type: REQUESTING_INITIAL_DATA,
  payload,
});
export const requestingInitialDataError = (payload) => ({
  type: REQUESTING_INITIAL_DATA_ERROR,
  payload,
});
export const receiveInitialData = (payload) => ({
  type: RECIEVE_INITIAL_DATA,
  payload,
});
export const requestInitialData = () => async (dispatch) => {
  try {
    dispatch(requestingInitialData(true));
    await dispatch(requestAdvisories());
    await dispatch(requestStations());
    await dispatch(requestTrainCount());
    await dispatch(requestElevatorStatus());
    dispatch(receiveInitialData(true));
  } catch (error) {
    dispatch(requestingInitialDataError(error));
  } finally {
    dispatch(requestingInitialData(false));
  }
};

export const REQUESTING_STATIONS = 'requesting stations';
export const REQUESTING_STATIONS_ERROR = 'requesting stations error';
export const RECEIVE_STATIONS = 'receive stations';
export const requestingStations = (payload) => ({
  type: REQUESTING_STATIONS,
  payload,
});
export const requestingStationsError = (payload) => ({
  type: REQUESTING_STATIONS_ERROR,
  payload,
});
export const receiveStations = (payload) => ({
  type: RECEIVE_STATIONS,
  payload,
});
export function requestStations() {
  return (dispatch, _, { API_KEY }) => {
    dispatch(requestingStations(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStations(json))
      .then((normalized) => dispatch(receiveStations(normalized)))
      .catch((error) => dispatch(requestingStationsError(error)))
      .finally(() => dispatch(requestingStations(false)));
  };
}
export const REQUESTING_ADVISORIES = 'requesting advisors';
export const REQUESTING_ADVISORIES_ERROR = 'requesting advisories error';
export const RECEIVE_ADVISORIES = 'receive advisories';
export const requestingAdvisories = (payload) => ({
  type: REQUESTING_ADVISORIES,
  payload,
});
export const requestingAdvisoriesError = (payload) => ({
  type: REQUESTING_ADVISORIES_ERROR,
  payload,
});
export const receiveAdvisories = (payload) => ({
  type: RECEIVE_ADVISORIES,
  payload,
});
export function requestAdvisories() {
  return (dispatch, _, { API_KEY }) => {
    dispatch(requestingAdvisories(true));
    return fetch(
      `https://api.bart.gov/api/bsa.aspx?cmd=bsa&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeAdvisories(json))
      .then((normalized) => dispatch(receiveAdvisories(normalized)))
      .catch((error) => dispatch(requestingAdvisoriesError(error)))
      .finally(() => dispatch(requestingAdvisories(false)));
  };
}
export const REQUESTING_TRAIN_COUNT = 'requesting train cout';
export const REQUESTING_TRAIN_COUNT_ERROR = 'requesting train count error';
export const RECEIVE_TRAIN_COUNT = 'receive train count';
export const requestingTrainCount = (payload) => ({
  type: REQUESTING_TRAIN_COUNT,
  payload,
});
export const requestinTrainCountError = (payload) => ({
  type: REQUESTING_TRAIN_COUNT_ERROR,
  payload,
});
export const receiveTrainCount = (payload) => ({
  type: RECEIVE_TRAIN_COUNT,
  payload,
});
export function requestTrainCount() {
  return (dispatch, getState, { API_KEY }) => {
    dispatch(requestingTrainCount(true));
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=count&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeTrainCount(json))
      .then((normalized) => dispatch(receiveTrainCount(normalized)))
      .catch((error) => dispatch(requestinTrainCountError(error)))
      .finally(() => dispatch(requestingTrainCount(false)));
  };
}

export const REQUESTING_ELEVATOR_STATUS = 'requesting elevator status';
export const REQUESTING_ELEVATOR_STATUS_ERROR =
  'requesting elevator status error';
export const RECEIVE_ELEVATOR_STATUS = 'receive elevator status';
export const requestingElevatorStatus = (payload) => ({
  type: REQUESTING_ELEVATOR_STATUS,
  payload,
});
export const requestingElevatorStatusError = (payload) => ({
  type: REQUESTING_ELEVATOR_STATUS_ERROR,
  payload,
});
export const receiveElevatorStatus = (payload) => ({
  type: RECEIVE_ELEVATOR_STATUS,
  payload,
});
export function requestElevatorStatus() {
  return (dispatch, _, { API_KEY }) => {
    dispatch(requestingElevatorStatus(true));
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=elev&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeElevators(json))
      .then((normalized) => dispatch(receiveElevatorStatus(normalized)))
      .catch((error) => dispatch(requestingElevatorStatusError(error)))
      .finally(() => dispatch(requestingElevatorStatus(false)));
  };
}
export const REQUESTING_REAL_TIME_ESTIMATES = 'requesting real time estimates';
export const REQUESTING_REAL_TIME_ESTIMATES_ERROR =
  'requesting real time estimates error';
export const RECEIVE_REAL_TIME_ESTIMATES = 'receive real time estimates';
export const requestingRealTimeEstimates = (payload) => ({
  type: REQUESTING_REAL_TIME_ESTIMATES,
  payload,
});
export const requestingRealTimeEstimatesError = (payload) => ({
  type: REQUESTING_REAL_TIME_ESTIMATES_ERROR,
  payload,
});
export const recieveRealTimeEstimates = (payload) => ({
  type: RECEIVE_REAL_TIME_ESTIMATES,
  payload,
});
export function requestRealTimeEstimates(station) {
  return (dispatch, _, { API_KEY }) => {
    requestingRealTimeEstimates(true);
    return fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeRealTimeEstimates(json))
      .then((normalized) => dispatch(recieveRealTimeEstimates(normalized)))
      .catch((error) => dispatch(requestingRealTimeEstimatesError(error)))
      .finally(() => dispatch(requestingRealTimeEstimates(false)));
  };
}

export const REQUESTING_TRIP_PLANNING = 'requesting trip planning';
export const REQUESTING_TRIP_PLANNING_ERROR = ' requesting trip planning error';
export const RECEIVE_TRIP_PLANNING = 'receive trip planning';
export const requestingTripPlanning = (payload) => ({
  type: REQUESTING_TRIP_PLANNING,
  payload,
});
export const requestingTripPlanningError = (payload) => ({
  type: REQUESTING_TRIP_PLANNING_ERROR,
  payload,
});
export const receiveTripPlanning = (payload) => ({
  type: RECEIVE_TRIP_PLANNING,
  payload,
});

export function requestTripPlanning(originAbbr, destAbbr, date) {
  return (dispatch, getState, { API_KEY }) => {
    dispatch(requestingTripPlanning(true));
    return fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${originAbbr}&dest=${destAbbr}&date=today&time=now&key=${API_KEY}&b=1&a=4&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeTripPlanning(json))
      .then((normalized) => dispatch(receiveTripPlanning(normalized)))
      .catch((error) => dispatch(requestingTripPlanningError(error)))
      .finally(() => dispatch(requestingTripPlanning(false)));
  };
}
