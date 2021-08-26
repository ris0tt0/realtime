import {
  requestStationAccess,
  requestStationInfo,
  requestStations,
} from './station-information';

export const SET_NAME = 'set name';
export const setName = (payload) => ({ type: SET_NAME, payload });

export const REQUESTING_INIT_BART_APP = 'requesting initialize bart app';
export const REQUESTING_INIT_BART_APP_ERROR =
  'requesting initialize bart app error';
export const requestingInitBartApp = (payload) => ({
  type: REQUESTING_INIT_BART_APP,
  payload,
});
export const requestingInitBartAppError = (payload) => ({
  type: REQUESTING_INIT_BART_APP_ERROR,
  payload,
});

export const initBartApp = () => (dispatch) => {
  dispatch(requestingInitBartApp(true));

  dispatch(requestStations())
    .then(() => dispatch(requestStationInfo()))
    .then(() => dispatch(requestStationAccess()))
    .catch((error) => dispatch(requestingInitBartAppError(error)))
    .finally(() => dispatch(requestingInitBartApp(false)));
};
