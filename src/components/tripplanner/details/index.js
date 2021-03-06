import {connect} from 'react-redux';
import {Details} from './Details';
import Logger from 'js-logger';
import {getTripPlannerTripDetails, getHasDestinationStartingAbbr} from '../../../selectors/';

const mapStateToProps = state =>
{
	const data = getTripPlannerTripDetails(state);

	if( getHasDestinationStartingAbbr(state) && data.leg)
	{
		const d = {
			clipper:data['@clipper'],
			destTimeDate:data['@destTimeDate'],
			destTimeMin:data['@destTimeMin'],
			destination:data.destination,
			fare:data['@fare'],
			origTimeDate:data['@origTimeDate'],
			origTimeMin:data['@origTimeMin'],
			origin:data.origin,
			tripTime:data['@tripTime'],
		}
		return {data:{...d,leg:[...data.leg]}};
	}
	return {data:{origin:{name:''},destination:{name:''}}};
}

const mapDispatchToProps = dispatch =>{
	return {
		onLegDetails:() => 'leg details',
	};
}

const DetailsContainer = connect(mapStateToProps,mapDispatchToProps)(Details);

export default DetailsContainer;