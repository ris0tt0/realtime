import React from 'react'
import PropTypes from 'prop-types'

export function DetailsLeg({startTime,startStationName,endTime,endStationName,routeInformation}) {
	return (
		<div>
			<div>
				<span>{startTime}</span><span>{startStationName}</span>
			</div>
			<div>
				<span>{routeInformation}</span>
			</div>
			<div>
				<span>{endTime}</span><span>{endStationName}</span>
			</div>
		</div>
	)
}

DetailsLeg.propTypes = {
	startTime:PropTypes.string.isRequired,
	startStationName:PropTypes.string.isRequired,
	endTime:PropTypes.string.isRequired,
	endStationName:PropTypes.string.isRequired,
	routeInformation:PropTypes.object.isRequired,
}