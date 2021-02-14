import { combineReducers } from 'redux';
import {
  RECEIVE_ADVISORIES,
  RECEIVE_ELEVATOR_STATUS,
  RECEIVE_REAL_TIME_ESTIMATES,
  RECEIVE_ROUTES,
  RECEIVE_STATIONS,
  RECEIVE_TRAIN_COUNT,
  RECEIVE_TRIP_PLANNING,
  RECIEVE_INITIAL_DATA,
  REQUESTING_ADVISORIES,
  REQUESTING_ADVISORIES_ERROR,
  REQUESTING_ELEVATOR_STATUS,
  REQUESTING_ELEVATOR_STATUS_ERROR,
  REQUESTING_INITIAL_DATA,
  REQUESTING_INITIAL_DATA_ERROR,
  REQUESTING_REAL_TIME_ESTIMATES,
  REQUESTING_REAL_TIME_ESTIMATES_ERROR,
  REQUESTING_ROUTES,
  REQUESTING_ROUTES_ERROR,
  REQUESTING_STATIONS_ERROR,
  REQUESTING_TRAIN_COUNT,
  REQUESTING_TRAIN_COUNT_ERROR,
  REQUESTING_TRIP_PLANNING,
  REQUESTING_TRIP_PLANNING_ERROR,
  SET_DESTINATION_ABBR,
  SET_STARTING_ABBR,
  SET_TRIP_PLANNER_DETAILS,
  SHOW_SORT_SELECTION,
} from '../actions/';

import produce from 'immer';

function sortSelection(state = '', action) {
  switch (action.type) {
    case SHOW_SORT_SELECTION:
      return action.selection === '' ? 'named' : action.selection;
    default:
      return state;
  }
}

function destinationAbbr(state = '', action) {
  switch (action.type) {
    case SET_DESTINATION_ABBR:
      return action.abbr;
    default:
      return state;
  }
}

function startingAbbr(state = '', action) {
  switch (action.type) {
    case SET_STARTING_ABBR:
      return action.abbr;
    default:
      return state;
  }
}

function tripPlannerDetailsId(state = 'tripId', action) {
  switch (action.type) {
    case SET_TRIP_PLANNER_DETAILS:
      return action.tripId;
    default:
      return state;
  }
}

const Routes = produce(
  (
    draft = { isRequesting: false, error: null, isInitLoaded: false },
    action
  ) => {
    switch (action.type) {
      case RECEIVE_ROUTES:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      case REQUESTING_ROUTES:
        draft.isRequesting = action.payload;
        return;
      case REQUESTING_ROUTES_ERROR:
        draft.error = action.payload;
        return;
      default:
        return draft;
    }
  }
);

const AppData = produce(
  (
    draft = { isRequesting: false, error: null, isInitLoaded: false },
    action
  ) => {
    switch (action.type) {
      case RECIEVE_INITIAL_DATA:
        draft.isInitLoaded = action.payload;
        return;
      case REQUESTING_INITIAL_DATA:
        draft.isRequesting = action.payload;
        return;
      case REQUESTING_INITIAL_DATA_ERROR:
        draft.error = action.payload;
        return;
      default:
        return draft;
    }
  }
);
const Advisories = produce(
  (
    draft = { isRequesting: false, entities: {}, result: [], error: null },
    action
  ) => {
    switch (action.type) {
      case REQUESTING_ADVISORIES:
        draft.isRequesting = action.payload;
        break;
      case REQUESTING_ADVISORIES_ERROR:
        draft.error = action.payload;
        break;
      case RECEIVE_ADVISORIES:
        Object.keys(action.payload).forEach(
          (key) => (draft[key] = action.payload[key])
        );
        break;
      default:
        return draft;
    }
  }
);
const Stations = produce(
  (draft = { isRequesting: false, entities: {}, result: [] }, action) => {
    switch (action.type) {
      case REQUESTING_STATIONS_ERROR:
        draft.isRequesting = action.payload;
        return;
      case RECEIVE_STATIONS:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      default:
        return draft;
    }
  }
);

const TrainCount = produce(
  (
    draft = { isRequesting: false, entities: {}, result: [], error: null },
    action
  ) => {
    switch (action.type) {
      case REQUESTING_TRAIN_COUNT_ERROR:
        draft.error = action.payload;
        return;
      case REQUESTING_TRAIN_COUNT:
        draft.isRequesting = action.paylod;
        return;
      case RECEIVE_TRAIN_COUNT:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      default:
        return draft;
    }
  }
);

const ElevatorStatus = produce(
  (
    draft = { isRequesting: false, entities: {}, result: [], error: null },
    action
  ) => {
    switch (action.type) {
      case REQUESTING_ELEVATOR_STATUS:
        draft.isRequesting = action.payload;
        return;
      case REQUESTING_ELEVATOR_STATUS_ERROR:
        draft.error = action.payload;
        return;
      case RECEIVE_ELEVATOR_STATUS:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      default:
        return draft;
    }
  }
);
const RealTimeEstimates = produce(
  (
    draft = { isRequesting: false, entities: {}, result: [], error: null },
    action
  ) => {
    switch (action.type) {
      case REQUESTING_REAL_TIME_ESTIMATES:
        draft.isRequesting = action.payload;
        return;
      case REQUESTING_REAL_TIME_ESTIMATES_ERROR:
        draft.error = action.payload;
        return;
      case RECEIVE_REAL_TIME_ESTIMATES:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      default:
        return draft;
    }
  }
);

const TripPlanning = produce(
  (
    draft = { isRequesting: false, entities: {}, result: [], error: null },
    action
  ) => {
    switch (action.type) {
      case REQUESTING_TRIP_PLANNING:
        draft.isRequesting = action.payload;
        return;
      case REQUESTING_TRIP_PLANNING_ERROR:
        draft.error = action.payload;
        return;
      case RECEIVE_TRIP_PLANNING:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        return;
      default:
        return draft;
    }
  }
);
const rootReducer = combineReducers({
  AppData,
  Advisories,
  Stations,
  TrainCount,
  ElevatorStatus,
  RealTimeEstimates,
  TripPlanning,
  Routes,
  sortSelection,
  destinationAbbr,
  startingAbbr,
  tripPlannerDetailsId,
});

export default rootReducer;
