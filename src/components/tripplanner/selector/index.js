import { connect } from 'react-redux';
import {StationsSelection} from './StationsSelection';
import {getStationArray} from '../../../selectors/'
import {setDestinationAbbr,setStartingAbbr,fetchTripPlanning} from '../../../actions/';

import Logger from 'js-logger';

const mapStateToProps = state => {
	let list = getStationArray(state);

	return {
		startingAbbr:state.startingAbbr,
		destinationAbbr:state.destinationAbbr,
		stations:list,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onSearch: () => dispatch(fetchTripPlanning()),
		onStarting: abbr => dispatch(setStartingAbbr(abbr)),
		onDestination: abbr => dispatch(setDestinationAbbr(abbr)),
	};
}

const StationSelectorContainer = connect(mapStateToProps,mapDispatchToProps)(StationsSelection);

export default StationSelectorContainer;