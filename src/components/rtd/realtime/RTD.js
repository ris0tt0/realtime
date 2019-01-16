import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

function RTD({time,stationName,onClick})
{
	return (
		<div className='rtd-sort-selector'>
			<div className='rtd-sort-header'>
				<span>{stationName}</span>
				<span className='rtd-float-right'>{time}</span>
			</div>
			<div>
				<span>Sort by: </span><a href="#" onClick={e => {e.stopPropagation(); onClick('name');}}>Name</a> | <a href="#" key='platfrom' onClick={e => {e.stopPropagation();onClick('platform');}}>Platform</a>
			</div>
		</div>
	)
}

RTD.propTypes = {
	time:PropTypes.string.isRequired,
	stationName:PropTypes.string.isRequired,
	onClick:PropTypes.func.isRequired,
}

export default RTD

