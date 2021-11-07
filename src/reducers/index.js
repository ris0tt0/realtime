import { produce } from 'immer';
import { combineReducers } from 'redux';
import {
  REQUESTING_BSA,
  REQUESTING_BSA_ERROR,
  REQUESTING_COUNT,
  REQUESTING_COUNT_ERROR,
  REQUESTING_ELEVATOR,
  REQUESTING_ELEVATOR_ERROR,
  REQUESTING_ETD,
  REQUESTING_ETD_ERROR,
  REQUESTING_FARE,
  REQUESTING_FARE_ERROR,
  REQUESTING_ROUTEINFO,
  REQUESTING_ROUTEINFO_ERROR,
  REQUESTING_ROUTES,
  REQUESTING_ROUTESCHED,
  REQUESTING_ROUTESCHED_ERROR,
  REQUESTING_ROUTES_ERROR,
  REQUESTING_SPECIAL,
  REQUESTING_SPECIAL_ERROR,
  REQUESTING_STNACCESS,
  REQUESTING_STNACCESS_ERROR,
  REQUESTING_STNINFO,
  REQUESTING_STNINFO_ERROR,
  REQUESTING_STNS,
  REQUESTING_STNSCHED,
  REQUESTING_STNSCHED_ERROR,
  REQUESTING_STNS_ERROR,
  REQUESTING_TRIP,
  REQUESTING_TRIP_ERROR,
  REQUEST_BSA_RESULT,
  REQUEST_COUNT_RESULT,
  REQUEST_ELEVATOR_RESULT,
  REQUEST_ETD_RESULT,
  REQUEST_FARE_RESULT,
  REQUEST_ROUTEINFO_RESULT,
  REQUEST_ROUTESCHED_RESULT,
  REQUEST_ROUTES_RESULT,
  REQUEST_SPECIAL_RESULT,
  REQUEST_STNACCESS_RESULT,
  REQUEST_STNINFO_RESULT,
  REQUEST_STNSCHEDL_RESULT,
  REQUEST_STNSL_RESULT,
  REQUEST_TRIP_RESULT,
  SET_NAME,
} from '../actions';

const initState = {
  name: null,
  // advisories
  bsa: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  count: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  elevator: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  // real time estimates
  etd: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  // route information
  routeinfo: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  routes: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  //schedule information
  trip: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  fare: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  routesched: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  special: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  stnsched: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  // station information
  stnaccess: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  stninfo: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
  stns: {
    requesting: false,
    error: null,
    entities: null,
    result: null,
  },
};

const jbart = produce((draft, action) => {
  switch (action.type) {
    case SET_NAME:
      draft.name = action.payload;
      break;
    //
    case REQUESTING_BSA:
      draft.bsa.requesting = action.payload;
      break;
    case REQUESTING_BSA_ERROR:
      draft.bsa.error = action.payload;
      break;
    case REQUEST_BSA_RESULT:
      draft.bsa.entities = action.payload.entities;
      draft.bsa.result = action.payload.result;
      break;
    //
    case REQUESTING_COUNT:
      draft.count.requesting = action.payload;
      break;
    case REQUESTING_COUNT_ERROR:
      draft.count.error = action.payload;
      break;
    case REQUEST_COUNT_RESULT:
      draft.count.entities = action.payload.entities;
      draft.count.result = action.payload.result;
      break;
    //
    case REQUESTING_ELEVATOR:
      draft.elevator.requesting = action.payload;
      break;
    case REQUESTING_ELEVATOR_ERROR:
      draft.elevator.error = action.payload;
      break;
    case REQUEST_ELEVATOR_RESULT:
      draft.elevator.entities = action.payload.entities;
      draft.elevator.result = action.payload.result;
      break;
    //real time estimates
    case REQUESTING_ETD:
      draft.etd.requesting = action.payload;
      break;
    case REQUESTING_ETD_ERROR:
      draft.etd.error = action.payload;
      break;
    case REQUEST_ETD_RESULT:
      draft.etd.entities = action.payload.entities;
      draft.etd.result = action.payload.result;
      break;
    // route information
    case REQUESTING_ROUTEINFO:
      draft.routeinfo.requesting = action.payload;
      break;
    case REQUESTING_ROUTEINFO_ERROR:
      draft.routeinfo.error = action.payload;
      break;
    case REQUEST_ROUTEINFO_RESULT:
      draft.routeinfo.entities = action.payload.entities;
      draft.routeinfo.result = action.payload.result;
      break;
    case REQUESTING_ROUTES:
      draft.routes.requesting = action.payload;
      break;
    case REQUESTING_ROUTES_ERROR:
      draft.routes.error = action.payload;
      break;
    case REQUEST_ROUTES_RESULT:
      draft.routes.entities = action.payload.entities;
      draft.routes.result = action.payload.result;
      break;
    // schedule information
    case REQUESTING_TRIP:
      draft.trip.requesting = action.payload;
      break;
    case REQUESTING_TRIP_ERROR:
      draft.trip.error = action.payload;
      break;
    case REQUEST_TRIP_RESULT:
      draft.trip.entities = action.payload.entities;
      draft.trip.result = action.payload.result;
      break;
    case REQUESTING_FARE:
      draft.fare.requesting = action.payload;
      break;
    case REQUESTING_FARE_ERROR:
      draft.fare.error = action.payload;
      break;
    case REQUEST_FARE_RESULT:
      draft.fare.entities = action.payload.entities;
      draft.fare.result = action.payload.result;
      break;
    case REQUESTING_ROUTESCHED:
      draft.routesched.requesting = action.payload;
      break;
    case REQUESTING_ROUTESCHED_ERROR:
      draft.routesched.error = action.payload;
      break;
    case REQUEST_ROUTESCHED_RESULT:
      draft.routesched.entities = action.payload.entities;
      draft.routesched.result = action.payload.result;
      break;
    case REQUESTING_SPECIAL:
      draft.special.requesting = action.payload;
      break;
    case REQUESTING_SPECIAL_ERROR:
      draft.special.error = action.payload;
      break;
    case REQUEST_SPECIAL_RESULT:
      draft.special.entities = action.payload.entities;
      draft.special.result = action.payload.result;
      break;
    case REQUESTING_STNSCHED:
      draft.stnsched.requesting = action.payload;
      break;
    case REQUESTING_STNSCHED_ERROR:
      draft.stnsched.error = action.payload;
      break;
    case REQUEST_STNSCHEDL_RESULT:
      draft.stnsched.entities = action.payload.entities;
      draft.stnsched.result = action.payload.result;
      break;
    // station information
    case REQUESTING_STNACCESS:
      draft.stnaccess.requesting = action.payload;
      break;
    case REQUESTING_STNACCESS_ERROR:
      draft.stnaccess.error = action.payload;
      break;
    case REQUEST_STNACCESS_RESULT:
      draft.stnaccess.entities = action.payload.entities;
      draft.stnaccess.result = action.payload.result;
      break;
    case REQUESTING_STNINFO:
      draft.stninfo.requesting = action.payload;
      break;
    case REQUESTING_STNINFO_ERROR:
      draft.stninfo.error = action.payload;
      break;
    case REQUEST_STNINFO_RESULT:
      draft.stninfo.entities = action.payload.entities;
      draft.stninfo.result = action.payload.result;
      break;
    case REQUESTING_STNS:
      draft.stns.requesting = action.payload;
      break;
    case REQUESTING_STNS_ERROR:
      draft.stns.error = action.payload;
      break;
    case REQUEST_STNSL_RESULT:
      draft.stns.entities = action.payload.entities;
      draft.stns.result = action.payload.result;
      break;
    //
  }
}, initState);

const rootReducers = combineReducers({
  jbart,
});

export { rootReducers };
