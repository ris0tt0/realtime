import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

function StationRTDItem({destination,estimate})
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
		<div className='rtd-station-item'>
			<span>{destination}</span>
			<span className='rtd-float-right'>{times}</span>
		</div>
	)
}

StationRTDItem.propTypes = {
	destination:PropTypes.string.isRequired,
	estimate:PropTypes.object.isRequired,
}

export {StationRTDItem}

