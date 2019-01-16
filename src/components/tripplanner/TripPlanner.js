import React from 'react'
import PropTypes from 'prop-types'

import Selector from './selector/';
import Result from './result/';
import Details from './details/';

function TripPlanner(props) {
	return (
		<div>
			<h1>Trip Planning</h1>
			<Selector />
			<Result />
			<Details />			
		</div>
	)
}

TripPlanner.propTypes = {

}

export default TripPlanner

