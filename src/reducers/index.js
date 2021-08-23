import produce, { enableMapSet } from 'immer';
import { combineReducers } from 'redux';
import { SET_NAME } from '../actions';

enableMapSet();

const appBartData = produce(
  (draft, action) => {
    switch (action.type) {
      case SET_NAME:
        draft.name = action.payload;
        break;
    }
  },
  { name: '' }
);

const rootReducers = combineReducers({
  appBartData,
});

export { rootReducers };
