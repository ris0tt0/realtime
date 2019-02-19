import {connect} from 'react-redux';
import {Details} from './Details';
import Logger from 'js-logger';
import {getTripPlannerTripDetails} from '../../../selectors/';

const mapStateToProps = state =>
{
	const data = getTripPlannerTripDetails(state);

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

const mapDispatchToProps = dispatch =>{
	return {
		onLegDetails:() => 'leg details',
	};
}

const DetailsContainer = connect(mapStateToProps,mapDispatchToProps)(Details);

export default DetailsContainer;