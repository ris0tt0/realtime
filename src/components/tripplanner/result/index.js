import {connect} from 'react-redux';
import {Result} from './Result';
import {setTripPlannerDetails} from '../../../actions/';
import {getTripPlannerTrips, getHasTripPlannerDetailsDetailsId, getHasDestinationStartingAbbr} from '../../../selectors/';
import Logger from 'js-logger';

const mapStateToProps = state =>
{
	const hasAllAbbr = getHasDestinationStartingAbbr(state);

	if( hasAllAbbr )
	{
		const trips = getTripPlannerTrips(state);
		// Logger.info(trips);
		return {trips};
	}
	else
	{
		return {trips:[]};
	}
}

const mapDispatchToProps = dispatch =>{
	return {
		onSelect: tripId => dispatch(setTripPlannerDetails(tripId)),
	};
}

const ResultContainer = connect(mapStateToProps,mapDispatchToProps)(Result);

export default ResultContainer;