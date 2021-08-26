import produce, { enableMapSet } from 'immer';
import { combineReducers } from 'redux';
import { SET_NAME } from '../actions';
import {
  RECEIVE_STATIONS,
  RECEIVE_STATION_ACCESS,
  RECEIVE_STATION_INFO,
  REQUESTING_STATIONS,
  REQUESTING_STATIONS_ERROR,
  REQUESTING_STATION_ACCESS,
  REQUESTING_STATION_ACCESS_ERROR,
  REQUESTING_STATION_INFO,
  REQUESTING_STATION_INFO_ERROR,
} from '../actions/station-information';

enableMapSet();

const appBartData = produce(
  (draft, { type, payload }) => {
    switch (type) {
      case SET_NAME:
        draft.name = payload;
        break;
      case REQUESTING_STATIONS:
        draft.isRequestingStations = payload;
        break;
      case REQUESTING_STATIONS_ERROR:
        draft.requestingStationsError = payload;
        break;
      case RECEIVE_STATIONS:
        draft.stations = payload;
        break;
      case REQUESTING_STATION_INFO:
        draft.isRequestingStationInfo = payload;
        break;
      case REQUESTING_STATION_INFO_ERROR:
        draft.requestingStationInfoError = payload;
        break;
      case RECEIVE_STATION_INFO:
        draft.stationInfo = payload;
        break;
      case REQUESTING_STATION_ACCESS:
        draft.isRequestingStationAccess = payload;
        break;
      case REQUESTING_STATION_ACCESS_ERROR:
        draft.requestingStationAccessError = payload;
        break;
      case RECEIVE_STATION_ACCESS:
        draft.stationAccess = payload;
        break;
    }
  },
  { name: '' }
);

const rootReducers = combineReducers({
  appBartData,
});

export { rootReducers };
