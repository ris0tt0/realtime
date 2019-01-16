import {connect} from 'react-redux';
import Details from './Details';
import Logger from 'js-logger'

const mapStateToProps = state =>{

	let origTimeMin = '';
	let destTimeMin = '';
	let tripTime = '';
	let tripChanges = '';
	let tripFare = '';

	const {entities,result} = state.tripPlanner;

	if(result.length > 0)
	{
		Logger.info(entities);
		// origTimeMin = 
	}
	else
	{
		Logger.info('nothing to see here.');
	}

	
	return {
		origTimeMin,
		destTimeMin,
		tripTime,
		tripChanges,
		tripFare,
	};
}

const mapDispatchToProps = dispatch =>{
	return {
		onLegDetails:() => 'leg details',
	};
}

const DetailsContainer = connect(mapStateToProps,mapDispatchToProps)(Details);

export default DetailsContainer;