import {
  normalizeFare,
  normalizeRouteSched,
  normalizeSpecial,
  normalizeStnSched,
  normalizeTrip,
} from '../normalize/Schedule';

export const REQUESTING_TRIP = 'requesting Trip';
export const requestingTrip = (payload) => ({
  type: REQUESTING_TRIP,
  payload,
});
export const REQUESTING_TRIP_ERROR = 'requesting Trip error';
export const requestingTripError = (payload) => ({
  type: REQUESTING_TRIP_ERROR,
  payload,
});
export const REQUEST_TRIP_RESULT = 'request Trip result';
export const requestTripResult = (payload) => ({
  type: REQUEST_TRIP_RESULT,
  payload,
});

export const requestTrip =
  (origin = 'oakl', destination = 'sfia', date = 'now') =>
  (dispatch, _, { BartKey }) => {
    const cmd = 'arrive';

    dispatch(requestingTrip(true));
    return fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=${cmd}&orig=${origin}&dest=${destination}&date=${date}&key=${BartKey}&b=2&a=2&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeTrip(json))
      .then((data) => dispatch(requestTripResult(data)))
      .catch((error) => dispatch(requestingTripError({ e: error })))
      .finally(() => dispatch(requestingTrip(false)));
  };

export const REQUESTING_FARE = 'requesting fare';
export const requestingFare = (payload) => ({
  type: REQUESTING_FARE,
  payload,
});
export const REQUESTING_FARE_ERROR = 'requesting fare error';
export const requestingFareError = (payload) => ({
  type: REQUESTING_FARE_ERROR,
  payload,
});
export const REQUEST_FARE_RESULT = 'request fare result';
export const requestFareResult = (payload) => ({
  type: REQUEST_FARE_RESULT,
  payload,
});

export const requestFare =
  (origin = '12th', destination = 'mcar', date = 'now') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingFare(true));
    return fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=fare&orig=${origin}&dest=${destination}&date=${date}&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeFare(json))
      .then((data) => dispatch(requestFareResult(data)))
      .catch((error) => dispatch(requestingFareError({ e: error })))
      .finally(() => dispatch(requestingFare(false)));
  };

export const REQUESTING_ROUTESCHED = 'requesting RouteSched';
export const requestingRouteSched = (payload) => ({
  type: REQUESTING_ROUTESCHED,
  payload,
});
export const REQUESTING_ROUTESCHED_ERROR = 'requesting RouteSched error';
export const requestingRouteSchedError = (payload) => ({
  type: REQUESTING_ROUTESCHED_ERROR,
  payload,
});
export const REQUEST_ROUTESCHED_RESULT = 'request RouteSched result';
export const requestRouteSchedResult = (payload) => ({
  type: REQUEST_ROUTESCHED_RESULT,
  payload,
});

export const requestRouteSchedule =
  (route = '1', date = 'now') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingRouteSched(true));
    return fetch(
      `https://api.bart.gov/api/sched.aspx?cmd=routesched&route=${route}&key=${BartKey}&date=${date}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeRouteSched(json))
      .then((data) => dispatch(requestRouteSchedResult(data)))
      .catch((error) => dispatch(requestingRouteSchedError({ e: error })))
      .finally(() => dispatch(requestingRouteSched(false)));
  };

export const REQUESTING_SPECIAL = 'requesting Special';
export const requestingSpecial = (payload) => ({
  type: REQUESTING_SPECIAL,
  payload,
});
export const REQUESTING_SPECIAL_ERROR = 'requesting Special error';
export const requestingSpecialError = (payload) => ({
  type: REQUESTING_SPECIAL_ERROR,
  payload,
});
export const REQUEST_SPECIAL_RESULT = 'request Special result';
export const requestSpecialResult = (payload) => ({
  type: REQUEST_SPECIAL_RESULT,
  payload,
});

export const requestSpecial =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingSpecial(true));
    return fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=special&key=${BartKey}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeSpecial(json))
      .then((data) => dispatch(requestSpecialResult(data)))
      .catch((error) => dispatch(requestingSpecialError({ e: error })))
      .finally(() => dispatch(requestingSpecial(false)));
  };

export const REQUESTING_STNSCHED = 'requesting StnSched';
export const requestingStnSched = (payload) => ({
  type: REQUESTING_STNSCHED,
  payload,
});
export const REQUESTING_STNSCHED_ERROR = 'requesting StnSched error';
export const requestingStnSchedError = (payload) => ({
  type: REQUESTING_STNSCHED_ERROR,
  payload,
});
export const REQUEST_STNSCHED_RESULT = 'request StnSched result';
export const requestStnSchedResult = (payload) => ({
  type: REQUEST_STNSCHED_RESULT,
  payload,
});

export const requestStationSchedule =
  (origin = '16th') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingStnSched(true));
    return fetch(
      `http://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=${origin}&key=${BartKey}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStnSched(json))
      .then((data) => dispatch(requestStnSchedResult(data)))
      .catch((error) => dispatch(requestingStnSchedError({ e: error })))
      .finally(() => dispatch(requestingStnSched(false)));
  };
