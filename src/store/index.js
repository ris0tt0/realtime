const { createStore, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const { default: thunk } = require('redux-thunk');
const { rootReducers } = require('../reducers');

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store };
