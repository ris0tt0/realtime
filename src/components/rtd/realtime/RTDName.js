import React from 'react'
import PropTypes from 'prop-types'

import {StationRTDItem} from '../../common/'

function RTDName({names})
{
	const stations = names.map((item,index) => <li key={index}>
																							<StationRTDItem 
																								destination={item.destination} 
																								estimate={item.estimate? item.estimate : {}}/>
																						</li>);

	return (
		<div>
			<ul>
				{stations}
			</ul>
		</div>
	)
}

RTDName.propTypes = {
	names:PropTypes.array.isRequired,
}

export default RTDName

