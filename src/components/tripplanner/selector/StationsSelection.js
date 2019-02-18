import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

const Stations = (stations,doNotIncludeAbbr,onSelect,label) =>
{
	if(doNotIncludeAbbr && doNotIncludeAbbr.length > 0)
	{
		stations = stations.filter( item => item.abbr !== doNotIncludeAbbr);
	}

	const stationElements = stations.map((item,index) =>
		<option key={index} value={item.abbr}>{item.name}</option> );

	stationElements.unshift(<option key={-1} value={' '}>  {label}</option>);

	return <select onChange={onSelect}>{stationElements}</select>;
}

export function StationsSelection({startingAbbr,destinationAbbr,stations,onSearch,onStarting,onDestination})
{
	return (
		<div className='stationselection'>
			<div className='stationselection__starting'>
				{Stations(stations,destinationAbbr,e =>
				{
					e.stopPropagation();
					onStarting(e.target.value);
				},'Enter starting point...')}
			</div>
			<div className='stationselection__destination'>
				{Stations(stations,startingAbbr,e =>
					{
						e.stopPropagation();
						onDestination(e.target.value);
					},'Enter destination...')}
			</div>
			<button onClick={e =>
				{
					e.stopPropagation();
					onSearch();
				}}>search</button>
		</div>
	)
}

StationsSelection.propTypes = {
	startingAbbr:PropTypes.string.isRequired,
	destinationAbbr:PropTypes.string.isRequired,
	// list of station data, used to populate selection lists.
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
	onStarting:PropTypes.func.isRequired,
	onDestination:PropTypes.func.isRequired,
}