import { normalizeRouteInfo, normalizeRoutes } from '../normalize/route';

export const REQUESTING_ROUTEINFO = 'requesting routeinfo';
export const requestingRouteInfo = (payload) => ({
  type: REQUESTING_ROUTEINFO,
  payload,
});
export const REQUESTING_ROUTEINFO_ERROR = 'requesting routeinfo error';
export const requestingRouteInfoError = (payload) => ({
  type: REQUESTING_ROUTEINFO_ERROR,
  payload,
});
export const REQUEST_ROUTEINFO_RESULT = 'request routeinfo result';
export const requestRouteInfoResult = (payload) => ({
  type: REQUEST_ROUTEINFO_RESULT,
  payload,
});

export const requestRouteInfo =
  (route = '1') =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingRouteInfo(true));
    return fetch(
      `https://api.bart.gov/api/route.aspx?cmd=routeinfo&route=${route}&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeRouteInfo(json))
      .then((data) => dispatch(requestRouteInfoResult(data)))
      .catch((error) => dispatch(requestingRouteInfoError({ e: error })))
      .finally(() => dispatch(requestingRouteInfo(false)));
  };

export const REQUESTING_ROUTES = 'requesting routes';
export const requestingRoutes = (payload) => ({
  type: REQUESTING_ROUTES,
  payload,
});
export const REQUESTING_ROUTES_ERROR = 'requesting routes error';
export const requestingRoutesError = (payload) => ({
  type: REQUESTING_ROUTES_ERROR,
  payload,
});
export const REQUEST_ROUTES_RESULT = 'request routes result';
export const requestRoutesResult = (payload) => ({
  type: REQUEST_ROUTES_RESULT,
  payload,
});

export const requestRoutes =
  () =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingRoutes(true));
    return fetch(
      `http://api.bart.gov/api/route.aspx?cmd=routes&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeRoutes(json))
      .then((data) => dispatch(requestRoutesResult(data)))
      .catch((error) => dispatch(requestingRoutesError({ e: error })))
      .finally(() => dispatch(requestingRoutes(false)));
  };
