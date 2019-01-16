import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

const CreateStationSelection = (stations,doNotIncludeAbbr,onSelect) =>
{
	if(doNotIncludeAbbr && doNotIncludeAbbr.length > 0)
	{
		stations = stations.filter( item => item.abbr !== doNotIncludeAbbr);
	}

	const stationElements = stations.map((item,index) =>
		<option key={index} value={item.abbr}>{item.name}</option> );

	stationElements.unshift(<option key={-1} value={' '}>--Please select--</option>);

	return <select onChange={onSelect}>{stationElements}</select>;
}

const StationSelector = ({startingAbbr,destinationAbbr,stations,onSearch,onStarting,onDestination}) =>
{
	return (
		<div>
			<div>
				{CreateStationSelection(stations,destinationAbbr,e =>
				{
					e.stopPropagation();
					onStarting(e.target.value);
				})}
			</div>
			<div>
				{CreateStationSelection(stations,startingAbbr,e =>
					{
						e.stopPropagation();
						onDestination(e.target.value);
					})}
			</div>
			<button onClick={e =>
				{
					e.stopPropagation();
					onSearch();
				}}>search</button>
		</div>
	)
}

StationSelector.propTypes = {
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

export default StationSelector



/*
		let stations = this.props.stations.map((item,index) =>
			<option key={index} value={item.abbr}>item.name</option> );
		
		if(doNotInclude != null)
			stations = stations.filter( item => item.abbr !== doNotInclude);

		stations.unshift(<option key={-1} value={' '}>--Please select--</option>);

		return <select onClick={this.onSelect}>{stations}</select>;
		*/