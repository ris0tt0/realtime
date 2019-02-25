import React, { Component } from 'react';
import './App.scss';

import RealTimeDepartures from './components/realtimedepartures';
import {TripPlanner} from './components/tripplanner/TripPlanner';

class App extends Component {
	render() {
		return (
			<div className="App">
				<RealTimeDepartures />
				<TripPlanner />
			</div>
		);
	}
}

export default App;
