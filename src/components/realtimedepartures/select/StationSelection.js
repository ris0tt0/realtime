import React from 'react'
import PropTypes from 'prop-types'

export function StationSelection({stations,onSelect}) {
	const stationList = stations.map( (item,index) =>
		<option key={index} value={item.abbr}>{item.name}</option> );

	return (
		<div className='realtimedepartures__stationselection'>
			<span>Select station to get upcoming departures:</span>
			<select onChange={ event => { onSelect(event.target.value) }}>
			{stationList}
			</select>
		</div>
	)
}

StationSelection.propTypes = {
	stations:PropTypes.arrayOf(
		PropTypes.shape({
			name:PropTypes.string.isRequired,
			abbr:PropTypes.string.isRequired,
			address:PropTypes.string.isRequired,
			city:PropTypes.string.isRequired,
			county:PropTypes.string.isRequired,
			gtfs_latitude:PropTypes.string.isRequired,
			gtfs_longitude:PropTypes.string.isRequired,
			state:PropTypes.string.isRequired,
			zipcode:PropTypes.string.isRequired,
		}).isRequired).isRequired,
	onSelect:PropTypes.func.isRequired,
}
