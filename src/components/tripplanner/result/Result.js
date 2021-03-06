import React from 'react'
import PropTypes from 'prop-types'

import Logger from 'js-logger';

export function Result({trips,onSelect})
{
	if( trips.length < 1) return <div></div>;

	const tripElements = trips.map((item,index) =>
	{
		const {tripId,startTime,startTimeReal,endTime,endTimeReal,timeLength,fare} = item;

		/** 
		 * TODO: figure out better way to set default data so we dont have to render
		 * initial default data.
		 */
		if( startTime === endTime) return <li key={index}></li>
		const formattedFare = new Intl.NumberFormat('en-us',{style:'currency',currency:'usd'}).format(parseInt(fare));

		return (
			<li key={index}>
				<div className='tripplannerresult__item' onClick={(event) => {event.stopPropagation(); onSelect(tripId)}}>
					<span className='tripplannerresult__starttime'>{startTime}</span> - <span className='tripplannerresult__endtime'>{endTime}</span>
					< br/>
					<span className='tripplannerresult__timelength'>Trip time: {timeLength}</span><span className='tripplannerresult__fare'>fare: {formattedFare}</span>
				</div>
			</li>);
	});

	return (
		<div className='tripplannerresult'>
			<ul>
				{tripElements}
			</ul>
		</div>
	)
}

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
