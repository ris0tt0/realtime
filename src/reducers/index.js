import { produce } from 'immer';
import {
  REQUESTING_ETD,
  REQUESTING_ETD_ERROR,
  REQUEST_ETD_RESULT,
} from '../actions/real-time-estimates';

import { combineReducers } from 'redux';
import { SET_NAME } from '../actions';
import {
  REQUESTING_BSA,
  REQUESTING_BSA_ERROR,
  REQUEST_BSA_RESULT,
} from '../actions/advisories.';

const createInitState = () => ({
  requesting: false,
  error: null,
  entities: null,
  result: null,
});

const name = (state = '', action) => {
  switch (action.type) {
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
};

const realtimeEstimates = produce((draft, action) => {
  switch (action.type) {
    case REQUESTING_ETD:
      draft.requesting = action.payload;
      break;
    case REQUESTING_ETD_ERROR:
      draft.error = action.payload;
      break;
    case REQUEST_ETD_RESULT:
      draft.entities = action.payload.entities;
      draft.result = action.payload.result;
      break;
  }
}, createInitState());

const bartServiceAdvisory = produce((draft, action) => {
  switch (action.type) {
    case REQUESTING_BSA:
      draft.requesting = action.payload;
      break;
    case REQUESTING_BSA_ERROR:
      draft.error = action.payload;
      break;
    case REQUEST_BSA_RESULT:
      draft.entities = action.payload.entities;
      draft.result = action.payload.result;
      break;
  }
}, createInitState());

const rootReducers = combineReducers({
  name,
  realtimeEstimates,
  bartServiceAdvisory,
});

export { rootReducers };
