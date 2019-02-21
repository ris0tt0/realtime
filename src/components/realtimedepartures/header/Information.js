import React from 'react'
import PropTypes from 'prop-types'

export function Information({numberOfTrains}) {
	return (
		<div className='realtimedepartures__information'>
			<h1>Real Time Departures</h1>
			<h3>{numberOfTrains} trains currently in service.</h3>
		</div>
	)
}

Information.propTypes = {
	numberOfTrains:PropTypes.string.isRequired,
}