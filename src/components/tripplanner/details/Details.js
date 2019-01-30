import React from 'react';
import PropTypes from 'prop-types';
import {DetailsLeg} from './DetailsLeg';
import Logger from 'js-logger';

function Details({data}) 
{
	if( data.origin.name.length < 1) return <div></div>;
	
	const detailsleg = data.leg.map( (item,index) => <li key={index}><DetailsLeg data={item} /></li> );
	const changes = data.leg.length;

	return (
		<div>
			<h3>{data.origin.name} to {data.destination.name}</h3>
			<div>
				<div><span>departure {data.origTimeMin}</span></div>
				<div><span>arrival {data.destTimeMin}</span></div>
				<div><span>trip time: {data.tripTime} min.</span></div>
			</div>
			<div>
				<span>changes:{changes}</span><span>fare: {data.fare}</span>
			</div>
			<div>
				<ul>
					{detailsleg}
				</ul>
			</div>
		</div>
	)
}

Details.propTypes = {
		/*
		clipper: "0.75"
		@co2: "2.54"
		@destTimeDate: "01/21/2019"
		@destTimeMin: "4:21 PM"
		@destination: "BALB"
		@fare: "2.50"
		@origTimeDate: "01/21/2019 "
		@origTimeMin: "4:14 PM"
		@origin: "16TH"
		@tripTime: "7"
		fares: "normal-4"
		*/

	clipper:PropTypes.string,
	c02:PropTypes.string,
	destTimeData:PropTypes.string,
	destTimeMin:PropTypes.string,
	destination:PropTypes.string,
	fare:PropTypes.string,
	origTimeDate:PropTypes.string,
	origTimeMin:PropTypes.string,
	origin:PropTypes.string,
	tripTime:PropTypes.string,
}

export default Details

