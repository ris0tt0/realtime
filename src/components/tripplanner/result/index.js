import {connect} from 'react-redux';
import Result from './Result';
import {setTripPlannerDetails} from '../../../actions/';
import {getTripPlannerTrips} from '../../../selectors/';
import Logger from 'js-logger';

const mapStateToProps = state =>
{
	const trips = getTripPlannerTrips(state);

	return {trips};
}

const mapDispatchToProps = dispatch =>{
	return {
		onSelect: tripId => dispatch(setTripPlannerDetails(tripId)),
	};
}

const ResultContainer = connect(mapStateToProps,mapDispatchToProps)(Result);

export default ResultContainer;