import {
  normalizeStationAccess,
  normalizeStationInfo,
  normalizeStations,
} from '../normalize/station-information';

export const REQUESTING_STATIONS = 'requesting bart stations';
export const REQUESTING_STATIONS_ERROR = 'requesting bart stations error';
export const RECEIVE_STATIONS = 'receive bart stations';

const requestingStations = (payload) => ({
  type: REQUESTING_STATIONS,
  payload,
});
const requestingStationsError = (payload) => ({
  type: REQUESTING_STATIONS_ERROR,
  payload,
});
const receiveStations = (payload) => ({
  type: RECEIVE_STATIONS,
  payload,
});
export function requestStations() {
  return (dispatch, _, { BART_API_KEY }) => {
    dispatch(requestingStations(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${BART_API_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStations(json))
      .then((normalized) => dispatch(receiveStations(normalized)))
      .catch((error) => dispatch(requestingStationsError(error)))
      .finally(() => dispatch(requestingStations(false)));
  };
}

export const REQUESTING_STATION_INFO = 'requesting bart station info';
export const REQUESTING_STATION_INFO_ERROR =
  'requesting bart station info error';
export const RECEIVE_STATION_INFO = 'receive bart station info';

const requestingStationInfo = (payload) => ({
  type: REQUESTING_STATION_INFO,
  payload,
});
const requestingStationInfoError = (payload) => ({
  type: REQUESTING_STATION_INFO_ERROR,
  payload,
});
const receiveStationInfo = (payload) => ({
  type: RECEIVE_STATION_INFO,
  payload,
});
export function requestStationInfo(orig = 'mcar') {
  return (dispatch, _, { BART_API_KEY }) => {
    dispatch(requestingStationInfo(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stninfo&key=${BART_API_KEY}&orig=${orig}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStationInfo(json))
      .then((normalized) => dispatch(receiveStationInfo(normalized)))
      .catch((error) => dispatch(requestingStationInfoError(error)))
      .finally(() => dispatch(requestingStationInfo(false)));
  };
}

export const REQUESTING_STATION_ACCESS = 'requesting bart station access';
export const REQUESTING_STATION_ACCESS_ERROR =
  'requesting bart station access error';
export const RECEIVE_STATION_ACCESS = 'receive bart station access';

const requestingStationAccess = (payload) => ({
  type: REQUESTING_STATION_ACCESS,
  payload,
});
const requestingStationAccessError = (payload) => ({
  type: REQUESTING_STATION_ACCESS_ERROR,
  payload,
});
const receiveStationAccess = (payload) => ({
  type: RECEIVE_STATION_ACCESS,
  payload,
});
export function requestStationAccess(orig = 'mcar') {
  return (dispatch, _, { BART_API_KEY }) => {
    dispatch(requestingStationAccess(true));
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stnaccess&key=${BART_API_KEY}&orig=${orig}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStationAccess(json))
      .then((normalized) => dispatch(receiveStationAccess(normalized)))
      .catch((error) => dispatch(requestingStationAccessError(error)))
      .finally(() => dispatch(requestingStationAccess(false)));
  };
}
