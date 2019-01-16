import React from 'react'
import PropTypes from 'prop-types'

function RTDHeader({numberOfTrains}) {
	return (
		<div>
			<h1>Real Time Departures</h1>
			<h3>{numberOfTrains} trains currently in service.</h3>
		</div>
	)
}

RTDHeader.propTypes = {
	numberOfTrains:PropTypes.string.isRequired,
}

export default RTDHeader