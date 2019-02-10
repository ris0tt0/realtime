import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';
import {StationItem} from '../../common';

export function Platform({platforms}) {
	const d = [];
	platforms.forEach( (value,platformName) =>
	{
		let min = [];

		value.forEach((train,stationAbbr) =>
		{
			Logger.info(`station abbr: ${stationAbbr} ${train.estimate}`);

			min.push(
			<li key={stationAbbr}>
				<StationItem destination={train.destination} estimate={train.estimate ? train.estimate : {}} />
			</li>)
			}
		);

		d.push(
		<div className='platform__item' key={platformName}>
			<h3>Platform {platformName}</h3>
			<ul>{min}</ul>
		</div>)
	});

	return <div className='platform'>{d}</div>
}

Platform.propTypes = {
	platforms:PropTypes.object.isRequired,
}
