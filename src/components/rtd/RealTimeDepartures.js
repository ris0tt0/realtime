import React from 'react';
import Header from './header';
import Station from './select';
import RealTime from './realtime';
import Name from './realtime/RTDNameContainer';
import Plaftorm from './realtime/RTDPlatformContainer';

const RealTimeDepartures = ({sortSelection}) =>
{
	return (
		<div>
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