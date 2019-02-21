import React from 'react';
import PropTypes from 'prop-types';
import {DetailsLeg} from './DetailsLeg';
import Logger from 'js-logger';

export function Details({data}) 
{
	if(data.origin.name === data.destination.name) return <div></div>

	const detailsleg = data.leg.map( (item,index) => <li key={index}><DetailsLeg data={item} /></li> );
	const changes = data.leg.length;
	const formattedFare = new Intl.NumberFormat('en-us',{style:'currency',currency:'usd'}).format(parseInt(data.fare));

	return (
		<div className='tripplannerdetails'>
			<h3>{data.origin.name} to {data.destination.name}</h3>
			<div className='tripplannerdetails__info'>
				<div className='tripplannerdetails__departure'><span>departure: {data.origTimeMin}</span></div>
				<div className='tripplannerdetails__arrival'><span>arrival: {data.destTimeMin}</span></div>
				<div className='tripplannerdetails__time'><span>trip time: {data.tripTime} min.</span></div>
				<div className='tripplannerdetails__changes'><span>changes:{changes}</span></div>
				<div className='tripplannerdetails__fare'><span>fare: {formattedFare}</span></div>
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
	data:PropTypes.shape({
		clipper:PropTypes.string.isRequired,
		destTimeMin:PropTypes.string.isRequired,
		destTimeDate:PropTypes.string.isRequired,
		fare:PropTypes.string.isRequired,
		origTimeDate:PropTypes.string.isRequired,
		origTimeMin:PropTypes.string.isRequired,
		destination:PropTypes.shape({
			abbr:PropTypes.string.isRequired,
			address:PropTypes.string.isRequired,
			city:PropTypes.string.isRequired,
			county:PropTypes.string.isRequired,
			gtfs_latitude:PropTypes.string.isRequired,
			gtfs_longitude:PropTypes.string.isRequired,
			id:PropTypes.string.isRequired,
			name:PropTypes.string.isRequired,
			state:PropTypes.string.isRequired,
			zipcode:PropTypes.string.isRequired,
		}).isRequired,
		origin:PropTypes.shape({
			abbr:PropTypes.string.isRequired,
			address:PropTypes.string.isRequired,
			city:PropTypes.string.isRequired,
			county:PropTypes.string.isRequired,
			gtfs_latitude:PropTypes.string.isRequired,
			gtfs_longitude:PropTypes.string.isRequired,
			id:PropTypes.string.isRequired,
			name:PropTypes.string.isRequired,
			state:PropTypes.string.isRequired,
			zipcode:PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
}
