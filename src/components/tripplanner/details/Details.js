import React from 'react';
import PropTypes from 'prop-types';
import {DetailsLeg} from './DetailsLeg';

function Details({origTimeMin,destTimeMin,tripTime,tripChanges,tripFare}) {
	return (
		<div>
			<p>this is deatils dubl antc</p>
			<div>
				<span>{origTimeMin}</span><span>-----(this is route with all legs included)----</span><span>{destTimeMin}</span>
			</div>
			<div>
				<span>{tripTime}</span><span>{tripChanges}</span><span>{tripFare}</span>
			</div>
		</div>
	)
}

Details.propTypes = {
	origTimeMin:PropTypes.string.isRequired,
	destTimeMin:PropTypes.string.isRequired,
	tripTime:PropTypes.string.isRequired,
	tripChanges:PropTypes.string.isRequired,
	tripFare:PropTypes.string.isRequired,
}

export default Details

