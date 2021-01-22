import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';

function RealTimeDeparturePlatform({ platformName, destination: { estimate } }) {

	return (
		<Paper>
			<Typography variant='h6'>Platform {platformName}</Typography>
			{estimate.map((est)=>{
				
			})}
		</Paper>
	)
}

RealTimeDeparturePlatform.propTypes = {};

export { RealTimeDeparturePlatform };
