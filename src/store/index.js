import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducers } from '../reducers';

// eslint-disable-next-line no-undef
const BartKey = process.env.BART_API_KEY ?? 'MW9S-E7SL-26DU-VV8V';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ BartKey })))
);

export { store };
