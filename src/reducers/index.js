import { combineReducers } from 'redux';
import {
  RECEIVE_ADVISORIES,
  RECEIVE_ROUTES,
  RECEIVE_RTE,
  RECEIVE_STATIONS,
  RECEIVE_TRAIN_COUNT,
  RECEIVE_TRIP_PLANNING,
  REQUESTING_ADVISORIES,
  REQUESTING_ADVISORIES_ERROR,
  REQUESTING_STATIONS_ERROR,
  SET_DESTINATION_ABBR,
  SET_STARTING_ABBR,
  SET_TRIP_PLANNER_DETAILS,
  SHOW_SORT_SELECTION,
} from '../actions/';

import produce from 'immer';

const rtdInitialState = {
  entities: {
    estimate: {
      id: {
        bikeflag: '',
        color: '',
        delay: '',
        direction: '',
        hexcolor: '',
        length: '',
        minutes: '',
        platform: '',
      },
    },
    etd: {
      id: {
        abbreviation: '',
        destination: '',
        estimate: ['id'],
        limited: '',
      },
    },
    response: {
      id: {
        '@id': '',
        date: '',
        message: '',
        station: 'id',
        time: '',
        uri: 'id',
      },
    },
    station: {
      id: {
        abbr: '',
        name: '',
        etd: ['id'],
      },
    },
    uri: {
      id: { '#data-selection': '' },
    },
  },
  result: 'id',
};

function rtd(state = rtdInitialState, action) {
  switch (action.type) {
    case RECEIVE_RTE:
      return { ...action.data };
    default:
      return { ...state };
  }
}

const stations = produce(
  (draft = { isRequesting: false, entities: {}, result: [] }, action) => {
    switch (action.type) {
      case REQUESTING_STATIONS_ERROR:
        draft.isRequesting = action.payload;
        return;
      case RECEIVE_STATIONS:
        Object.keys(action.payload).map(
          (key) => (draft[key] = action.payload[key])
        );
        return;
      default:
        return draft;
    }
  }
);

const trainCountInitailState = {
  result: 'id',
  entities: {
    traincount: {
      id: {
        date: '',
        message: '',
        time: '',
        traincount: 'unknown',
        uri: 'id',
      },
    },
    uri: {
      id: { '#data-selection': '' },
    },
  },
};
function traincount(state = trainCountInitailState, action) {
  switch (action.type) {
    case RECEIVE_TRAIN_COUNT:
      return { ...action.data };
    default:
      return { ...state };
  }
}

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

export const defaultTripPlannerTripObject = {
  '@origin': '12TH',
  '@destination': '12TH',
  '@fare': '',
  '@origTimeMin': '',
  '@origTimeDate': '',
  '@destTimeMin': '',
  '@destTimeDate': '',
  '@clipper': '',
  '@tripTime': '',
  '@co2': '',
  fares: {},
  leg: ['legId'],
};
const tripPlannerInitialState = {
  entities: {
    request: {
      requestId: {
        trip: ['tripId'],
      },
    },
    fare: {},
    fares: {},
    leg: {
      legId: {
        '@bikeflag': '',
        '@destTimeDate': '',
        '@destTimeMin': '',
        '@destination': '12TH',
        '@line': '',
        '@load': '',
        '@order': '',
        '@origTimeDate': '',
        '@origTimeMin': '',
        '@origin': '12TH',
        '@trainHeadStation': '',
        '@trainId': '',
        '@trainIdx': '',
        '@transfercode': '',
      },
    },
    response: {
      responseId: {
        schedule: 'scheduleId',
      },
    },
    schedule: {
      scheduleId: {
        after: '',
        before: '',
        date: '',
        request: 'requestId',
        time: '',
      },
    },
    trip: {
      tripId: { ...defaultTripPlannerTripObject },
    },
  },
  result: 'responseId',
};

function tripplanner(state = tripPlannerInitialState, action) {
  switch (action.type) {
    case RECEIVE_TRIP_PLANNING:
      return { ...action.data };
    default:
      return { ...state };
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

const routesInitialState = {
  entities: {
    route: {
      abbr: '',
      color: '',
      hexcolor: '',
      name: '',
      number: '',
      routeID: '',
    },
    routes: {
      id: ['id'],
    },
  },
  result: 'id',
};

function routes(state = routesInitialState, action) {
  switch (action.type) {
    case RECEIVE_ROUTES:
      return { ...action.routes };
    default:
      return { ...state };
  }
}

const advisories = produce(
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

const rootReducer = combineReducers({
  advisories,
  rtd,
  routes,
  stations,
  traincount,
  sortSelection,
  destinationAbbr,
  startingAbbr,
  tripplanner,
  tripPlannerDetailsId,
});

export default rootReducer;
