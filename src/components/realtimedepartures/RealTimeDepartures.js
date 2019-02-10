import React from 'react';
import Header from './header';
import Station from './select';
import RealTime from './results';
import Name from './results/NameContainer';
import Plaftorm from './results/PlatformContainer';

const RealTimeDepartures = ({sortSelection}) =>
{
	return (
		<div className='realtimedepartures'>
			<Header />
			<Station />
			<div>
				<RealTime />
				{sortSelection === 'platform' ? <Plaftorm /> : <Name />}
			</div>
		</div>
	)
}

export {RealTimeDepartures}