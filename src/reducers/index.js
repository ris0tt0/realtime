import { produce } from 'immer';
import {
  REQUESTING_ETD,
  REQUEST_ETD_RESULT,
} from '../actions/real-time-estimates';

import { combineReducers } from 'redux';
import { SET_NAME } from '../actions';

const name = (state = '', action) => {
  switch (action.type) {
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
};

const realtimeEstimates = produce(
  (draft, action) => {
    switch (action.type) {
      case REQUESTING_ETD:
        draft.requesting = action.payload;
        break;
      case REQUEST_ETD_RESULT:
        draft.entities = action.payload.entities;
        draft.result = action.payload.result;
        break;
    }
  },
  { requesting: false, error: null, entities: null, result: null }
);

const rootReducers = combineReducers({
  name,
  realtimeEstimates,
});

export { rootReducers };
