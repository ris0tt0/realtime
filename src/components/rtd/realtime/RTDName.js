import React from 'react'
import PropTypes from 'prop-types'

import {StationRTDItem} from '../../common/'

function RTDName({names}) {
	return (
		<div>
			<table className='rtd-station-table'>
				<tbody>
					<ul>
						{names.map((item,index) =>
							{
								return (
									<li key={index}>
										<StationRTDItem 
											destination={item.destination} 
											estimate={item.estimate? item.estimate : {}}/>
									</li>
								)
							})}
					</ul>
				</tbody>
			</table>
		</div>
	)
}

RTDName.propTypes = {
	names:PropTypes.array.isRequired,
}

export default RTDName

