import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const API_KEY = process.env.REACT_APP_BART_API ?? 'MW9S-E7SL-26DU-VV8V';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ API_KEY })))
);

export { store };
