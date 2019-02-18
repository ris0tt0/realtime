import React from 'react'

import Selector from './selector/';
import Result from './result/';
import Details from './details/';

function TripPlanner(props) {
	return (
		<div className='tripplanner'>
			<h1 className='tripplanner__header'>Trip Planning</h1>
			<Selector />
			<Result />
			<Details />			
		</div>
	)
}

export {TripPlanner}

