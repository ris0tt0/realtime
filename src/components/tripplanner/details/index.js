import {connect} from 'react-redux';
import Details from './Details';
import Logger from 'js-logger';
import {getTripPlannerTripDetails} from '../../../selectors/';

const mapStateToProps = state =>
{
	const data = getTripPlannerTripDetails(state);
	let leg = data.leg ? data.leg : [];

	const d = {
		clipper:data['@clipper'],
		co2:data['@co2'],
		destTimeDate:data['@destTimeDate'],
		destTimeMin:data['@destTimeMin'],
		destination:data.destination,
		fare:data['@fare'],
		origTimeDate:data['@origTimeDate'],
		origTimeMin:data['@origTimeMin'],
		origin:data.origin,
		tripTime:data['@tripTime'],
	}

	Logger.info(data);
	Logger.info(d);

	return {data:{...d,leg:[...leg]}};
}

const mapDispatchToProps = dispatch =>{
	return {
		onLegDetails:() => 'leg details',
	};
}

const DetailsContainer = connect(mapStateToProps,mapDispatchToProps)(Details);

export default DetailsContainer;