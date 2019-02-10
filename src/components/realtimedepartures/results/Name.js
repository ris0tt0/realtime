import React from 'react'
import PropTypes from 'prop-types'

import {StationItem} from '../../common'

export function Name({names})
{
	const stations = names.map((item,index) => 
		<li key={index}>
			<StationItem 
				destination={item.destination} 
				estimate={item.estimate? item.estimate : {}}/>
		</li>);

	return (
		<div className='name'>
			<ul>
				{stations}
			</ul>
		</div>
	)
}

Name.propTypes = {
	names:PropTypes.array.isRequired,
}