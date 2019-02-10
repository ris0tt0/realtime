import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

export function Sort({time,stationName,onClick})
{

	Logger.info('Sort');
	
	return (
		<div className='sort'>
			<div className='sort__header'>
				<span className='sort_headerName'>{stationName}</span>
				<span className='sort__headerTIme'>{time}</span>
			</div>
			<div className='sort__control'>
				<span>Sort by: </span>
					<a href="#" onClick={e => {e.stopPropagation(); onClick('name');}}>Name</a> | <a href="#" key='platfrom' onClick={e => {e.stopPropagation();onClick('platform');}}>Platform</a>
			</div>
		</div>
	)
}

Sort.propTypes = {
	time:PropTypes.string.isRequired,
	stationName:PropTypes.string.isRequired,
	onClick:PropTypes.func.isRequired,
}