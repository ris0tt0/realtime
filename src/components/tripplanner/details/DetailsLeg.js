import React from 'react'
import PropTypes from 'prop-types'
import Logger from 'js-logger';

export function DetailsLeg({data})
{
	Logger.info(data);

	return (
		<div className='detailsleg'>
				<span className='detailsleg__time'>{data['@origTimeMin']}</span><span className='detailsleg__name'>{data.origin.name}</span>
				<div style={{backgroundColor: data.line.color}}>
				<span className='detailsleg__line'>{data.line.name}</span>
				</div>
				<span className='detailsleg__time'>{data['@destTimeMin']}</span> <span className='detailsleg__name'>{data.destination.name}</span>
		</div>
	)
}

DetailsLeg.propTypes = {
	// startTime:PropTypes.string.isRequired,
	// startStationName:PropTypes.string.isRequired,
	// endTime:PropTypes.string.isRequired,
	// endStationName:PropTypes.string.isRequired,
	// routeInformation:PropTypes.object.isRequired,
}