import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

function Result({trips,onSelect})
{
	const tripElements = trips.map((item,index) =>
	{
		const {tripId,startTime,startTimeReal,endTime,endTimeReal,timeLength,fare} = item;
		
		return (
			<li key={index}>
				<div onClick={(event) => {event.stopPropagation(); onSelect(tripId)}}>
					<div><span>{startTime}</span> - <span>{endTime}</span></div>
					<div><span>{startTimeReal}</span> - <span>{endTimeReal}</span></div>
					<div><span>total time: {timeLength}</span> <span>{fare}</span></div>
				</div>
			</li>);
	});

	return (
		<div>
			<ul>
				{tripElements}
			</ul>
		</div>
	)
}

// {startTime,startTimeReal,endTime,endTimeReal,timeLength,fare}

Result.propTypes = {
	trips:PropTypes.arrayOf(
		PropTypes.shape({
			startTime:PropTypes.string.isRequired,
			startTimeReal:PropTypes.string.isRequired,
			endTime:PropTypes.string.isRequired,
			endTimeReal:PropTypes.string.isRequired,
			timeLength:PropTypes.string.isRequired,
			fare:PropTypes.string.isRequired,
	})).isRequired,
	onSelect:PropTypes.func.isRequired,
}

export default Result;

