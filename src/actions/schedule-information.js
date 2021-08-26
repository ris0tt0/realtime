import {
  normalizeSpecialSchedule,
  normalizeStationSchedule,
} from '../normalize/schedule-information';

export const REQUESTING_STATION_SCHEDULE = 'requesting bart station schedule';
export const REQUESTING_STATION_SCHEDULE_ERROR =
  'requesting bart station schedule error';
export const RECEIVE_STATION_SCHEDULE = 'receive bart station schedule';

const requestingStationSchedule = (payload) => ({
  type: REQUESTING_STATION_SCHEDULE,
  payload,
});
const requestingStationScheduleError = (payload) => ({
  type: REQUESTING_STATION_SCHEDULE_ERROR,
  payload,
});
const receiveStationSchedule = (payload) => ({
  type: RECEIVE_STATION_SCHEDULE,
  payload,
});
export function requestStationSchedule(orig = 'mcar') {
  return (dispatch, _, { BART_API_KEY }) => {
    dispatch(requestingStationSchedule(true));
    return fetch(
      `https://api.bart.gov/api/sched.aspx?cmd=stnsched&orig=${orig}&key=${BART_API_KEY}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeStationSchedule(json))
      .then((normalized) => dispatch(receiveStationSchedule(normalized)))
      .catch((error) => dispatch(requestingStationScheduleError(error)))
      .finally(() => dispatch(requestingStationSchedule(false)));
  };
}

export const REQUESTING_SPECIAL_SCHEDULE = 'requesting bart special schedule';
export const REQUESTING_SPECIAL_SCHEDULE_ERROR =
  'requesting bart special schedule error';
export const RECEIVE_SPECIAL_SCHEDULE = 'receive bart special schedule';

const requestingSpecialSchedule = (payload) => ({
  type: REQUESTING_SPECIAL_SCHEDULE,
  payload,
});
const requestingSpecialScheduleError = (payload) => ({
  type: REQUESTING_SPECIAL_SCHEDULE_ERROR,
  payload,
});
const receiveSpecialSchedule = (payload) => ({
  type: RECEIVE_SPECIAL_SCHEDULE,
  payload,
});
export function requestSpecialSchedule() {
  return (dispatch, _, { BART_API_KEY }) => {
    dispatch(requestingSpecialSchedule(true));
    return fetch(
      `https://api.bart.gov/api/sched.aspx?cmd=special&key=${BART_API_KEY}&l=1&json=y`
    )
      .then((response) => response.json())
      .then((json) => normalizeSpecialSchedule(json))
      .then((normalized) => dispatch(receiveSpecialSchedule(normalized)))
      .catch((error) => dispatch(requestingSpecialScheduleError(error)))
      .finally(() => dispatch(requestingSpecialSchedule(false)));
  };
}
