import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';
import {StationRTDItem} from '../../common/';

function RTDPlatform({platforms}) {
	const d = [];
	platforms.forEach( (value,platformName) =>
	{
		let min = [];

		value.forEach((train,stationAbbr) =>
		{
			Logger.info(`station abbr: ${stationAbbr} ${train.estimate}`);

			min.push(
			<li key={stationAbbr}>
				<StationRTDItem destination={train.destination} estimate={train.estimate ? train.estimate : {}} />
			</li>)
			}
		);

		d.push(
		<div key={platformName}>
			<h3>Platform {platformName}</h3>
			<ul>{min}</ul>
		</div>)
	});

	return <div className='rtd-station-table'>{d}</div>
}

RTDPlatform.propTypes = {
	platforms:PropTypes.object.isRequired,
}

export default RTDPlatform

