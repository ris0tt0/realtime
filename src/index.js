import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux'
import Logger from 'js-logger'
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/';
import {fetchTrainCount, fetchStations,fetchRealTimeEstimates, fetchRoutes} from './actions/';

import {getStationArray} from './selectors/';

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

Logger.useDefaults();

const remove = store.subscribe( () => Logger.info(store.getState()) );

store.dispatch( fetchStations())
	.then( () => store.dispatch( fetchRoutes() ))
	.then( () => store.dispatch( fetchTrainCount() ))
	.then( () => 
		{
			const stations = getStationArray(store.getState());
			if( stations[0] && stations[0].abbr)
			{
				store.dispatch( fetchRealTimeEstimates( stations[0].abbr ));
				return;
			}
			
			Logger.warn('Unable to find stations abbreviation');
		});

ReactDOM.render(
	<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
