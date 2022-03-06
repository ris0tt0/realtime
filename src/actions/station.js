import {
  normalizeStnAccess,
  normalizeStnInfo,
  normalizeStns,
} from '../normalize/Station';

export const REQUESTING_STNACCESS = 'requesting StnAccess';
export const requestingStnAccess = (payload) => ({
  type: REQUESTING_STNACCESS,
  payload,
});
export const REQUESTING_STNACCESS_ERROR = 'requesting StnAccess error';
export const requestingStnAccessError = (payload) => ({
  type: REQUESTING_STNACCESS_ERROR,
  payload,
});
export const REQUEST_STNACCESS_RESULT = 'request StnAccess result';
export const requestStnAccessesult = (payload) => ({
  type: REQUEST_STNACCESS_RESULT,
  payload,
});

export const requestStationAccess =
  (origin = '16th') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingStnAccess(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stnaccess&orig=${origin}&key=${BartKey}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStnAccess(json))
      .then((data) => dispatch(requestStnAccessesult(data)))
      .catch((error) => dispatch(requestingStnAccessError({ e: error })))
      .finally(() => dispatch(requestingStnAccess(false)));
  };

export const REQUESTING_STNINFO = 'requesting StnInfo';
export const requestingStnInfo = (payload) => ({
  type: REQUESTING_STNINFO,
  payload,
});
export const REQUESTING_STNINFO_ERROR = 'requesting StnInfo error';
export const requestingStnInfoError = (payload) => ({
  type: REQUESTING_STNINFO_ERROR,
  payload,
});
export const REQUEST_STNINFO_RESULT = 'request StnInfo result';
export const requestStnInfoResult = (payload) => ({
  type: REQUEST_STNINFO_RESULT,
  payload,
});

export const requestStationInfo =
  (origin = '16th') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingStnInfo(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${origin}&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStnInfo(json))
      .then((data) => dispatch(requestStnInfoResult(data)))
      .catch((error) => dispatch(requestingStnInfoError({ e: error })))
      .finally(() => dispatch(requestingStnInfo(false)));
  };

export const REQUESTING_STNS = 'requesting Stns';
export const requestingStns = (payload) => ({
  type: REQUESTING_STNS,
  payload,
});
export const REQUESTING_STNS_ERROR = 'requesting Stns error';
export const requestingStnsError = (payload) => ({
  type: REQUESTING_STNS_ERROR,
  payload,
});
export const REQUEST_STNS_RESULT = 'request Stns result';
export const requestStnsResult = (payload) => ({
  type: REQUEST_STNS_RESULT,
  payload,
});

export const requestStations =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingStns(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStns(json))
      .then((data) => dispatch(requestStnsResult(data)))
      .catch((error) => dispatch(requestingStnsError({ e: error })))
      .finally(() => dispatch(requestingStns(false)));
  };
