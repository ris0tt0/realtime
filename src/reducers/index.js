const { combineReducers } = require('redux');
const { SET_NAME } = require('../actions');

function name(state = '', action) {
  switch (action.type) {
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  name,
});

export { rootReducers };
