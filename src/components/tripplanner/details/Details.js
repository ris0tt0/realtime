import React from 'react';
import PropTypes from 'prop-types';
import {DetailsLeg} from './DetailsLeg';
import Logger from 'js-logger';

export function Details({data}) 
{
	if( data.origin.name.length < 1) return <div></div>;
	
	const detailsleg = data.leg.map( (item,index) => <li key={index}><DetailsLeg data={item} /></li> );
	const changes = data.leg.length;

	return (
		<div className='tripplannerdetails'>
			<h3>{data.origin.name} to {data.destination.name}</h3>
			<div className='tripplannerdetails__info'>
				<div className='tripplannerdetails__departure'><span>departure {data.origTimeMin}</span></div>
				<div className='tripplannerdetails__arrival'><span>arrival {data.destTimeMin}</span></div>
				<div className='tripplannerdetails__time'><span>trip time: {data.tripTime} min.</span></div>
				<div className='tripplannerdetails__changes'><span>changes:{changes}</span></div>
				<div className='tripplannerdetails__fare'><span>fare: {data.fare}</span></div>
			</div>
			<div className='tripplannerdetails__detailsleg'>
				<ul>
					{detailsleg}
				</ul>
			</div>
		</div>
	)
}

Details.propTypes = {
	data:PropTypes.object.isRequired,
	// clipper:PropTypes.string,
	// c02:PropTypes.string,
	// destTimeData:PropTypes.string,
	// destTimeMin:PropTypes.string,
	// destination:PropTypes.string,
	// fare:PropTypes.string,
	// origTimeDate:PropTypes.string,
	// origTimeMin:PropTypes.string,
	// origin:PropTypes.string,
	// tripTime:PropTypes.string,
}
