import { normalizeBsa, normalizeCount } from '../normalize/advisories';

export const REQUESTING_BSA = 'requesting bsa';
export const requestingBsa = (payload) => ({ type: REQUESTING_BSA, payload });

export const REQUESTING_BSA_ERROR = 'requesting bsa error';
export const requestingBsaError = (payload) => ({
  type: REQUESTING_BSA_ERROR,
  payload,
});

export const REQUEST_BSA_RESULT = 'request bsa result';
export const requestBsaResult = (payload) => ({
  type: REQUEST_BSA_RESULT,
  payload,
});

export const requestBsa =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingBsa(true));
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=bsa&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeBsa(json))
      .then((data) => dispatch(requestBsaResult(data)))
      .catch((error) => dispatch(requestingBsaError({ e: error })))
      .finally(() => dispatch(requestingBsa(false)));
  };

export const REQUESTING_COUNT = 'requesting count';
export const requestingCount = (payload) => ({
  type: REQUESTING_COUNT,
  payload,
});

export const REQUESTING_COUNT_ERROR = 'requesting count error';
export const requestingCountError = (payload) => ({
  type: REQUESTING_COUNT_ERROR,
  payload,
});

export const REQUEST_COUNT_RESULT = 'request count result';
export const requestCountResult = (payload) => ({
  type: REQUEST_COUNT_RESULT,
  payload,
});

export const requestCount =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingCount(true));
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=count&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeCount(json))
      .then((data) => dispatch(requestCountResult(data)))
      .catch((error) => dispatch(requestingCountError({ e: error })))
      .finally(() => dispatch(requestingCount(false)));
  };

export const REQUESTING_ELEVATOR = 'requesting elevator';
export const requestingElevator = (payload) => ({
  type: REQUESTING_ELEVATOR,
  payload,
});

export const REQUESTING_ELEVATOR_ERROR = 'requesting elevator error';
export const requestingElevatorError = (payload) => ({
  type: REQUESTING_ELEVATOR_ERROR,
  payload,
});

export const REQUEST_ELEVATOR_RESULT = 'request elevator result';
export const requestElevatorResult = (payload) => ({
  type: REQUEST_ELEVATOR_RESULT,
  payload,
});

export const requestElevator =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingElevator(true));
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=elev&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeBsa(json))
      .then((data) => dispatch(requestElevatorResult(data)))
      .catch((error) => dispatch(requestingElevatorError({ e: error })))
      .finally(() => dispatch(requestingElevator(false)));
  };
