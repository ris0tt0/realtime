import { normalizeEtd } from '../normalize/real-time-estimates';

export const REQUESTING_ETD = 'requesting etd';
export const requestingEtd = (payload) => ({ type: REQUESTING_ETD, payload });

export const REQUESTING_ETD_ERROR = 'requesting etd error';
export const requestingEtdError = (payload) => ({
  type: REQUESTING_ETD_ERROR,
  payload,
});

export const REQUEST_ETD_RESULT = 'request etd result';
export const requestEtdResult = (payload) => ({
  type: REQUEST_ETD_RESULT,
  payload,
});

export const requestEtd =
  (origin, platform = null, direction = null) =>
  (dispatch, _, { BartKey }) => {
    dispatch(requestingEtd(true));
    return fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${origin}&key=${BartKey}&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeEtd(json))
      .then((data) => dispatch(requestEtdResult(data)))
      .catch((error) => dispatch(requestingEtdError({ e: error })))
      .finally(() => dispatch(requestingEtd(false)));
  };
