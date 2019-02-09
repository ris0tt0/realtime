import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

export function StationItem({destination,estimate})
{
	const times = estimate.map(({minutes, length},index,list) =>
	{
		let time = minutes === 'Leaving' ? 
			`${minutes} (${length} car)` : 
			`${minutes} min (${length} car)`;

		if( index < list.length-1)time+=', ';
		
		return <span key={index}>{time}</span>;
	});

	return (
		<div className='stationitem'>
			<span className='stationitem__destination'>{destination}</span>
			<span className='stationitem__times'>{times}</span>
		</div>
	)
}

StationItem.propTypes = {
	destination:PropTypes.string.isRequired,
	estimate:PropTypes.object.isRequired,
}
