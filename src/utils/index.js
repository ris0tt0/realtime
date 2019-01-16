import Logger from 'js-logger';

export function getRealTimeByPlatform({entities = {},result = ''})
{
	Logger.info(`getRealTimeByPlatform ${result}`);
	const map = new Map();

	if( !entities.response) return map;

	const response = entities.response[result];
	const stationId = response.station[0];
	const station = entities.station[stationId];

	station.etd.forEach( key =>
	{
		const etd = entities.etd[key];
		const estimate = etd.estimate ? etd.estimate.map(item => entities.estimate[item] ) : [];

		estimate.forEach(estimate =>
			{
				Logger.info(`platform: ${estimate.platform} ${etd.destination}`);

				// make sure we have a map for each platform
				if( !map.has(estimate.platform)) map.set(estimate.platform,new Map());
				// map with abbr key and [estimate]
				if( !map.get(estimate.platform).has(etd.abbreviation)) map.get(estimate.platform).set(etd.abbreviation,{...etd,estimate:[]});
				// add the estimate data to the object
				map.get(estimate.platform).get(etd.abbreviation).estimate.push({...estimate});
			});
	});
	
	// sort the map by platform name, ie the key to the map.
	return new Map([...map.entries()].sort());
}

export function getRealTimeByName({entities = {},result = ''})
{
	Logger.info(`getRealTimeByName ${result}`);
	if( !entities.response) return [];

	const response = entities.response[result];
	const stationId = response.station[0];
	const station = entities.station[stationId];

	const stations = station.etd.map( key =>
	{
		const des = entities.etd[key];
		// add estime data.
		const estimate = des.estimate ? des.estimate.map(item => entities.estimate[item] ) : [];

		return {...des,estimate};
	});

	return stations;
}

export function getTripPlannerList({entities,result})
{
	if(!entities.request.requested) return [];

	const {trip} = entities.request.requested;
	
	return trip.map((key) =>
	{
		const item = entities.trip[key];

		Logger.info(item);
		const leg = item.leg.map(key => entities.leg[key]);
		const fares = entities.fares[item.fares];

		const startTime = item['@origTimeMin'];
		const startTimeReal = '';
		const endTime = item['@destTimeMin'];
		const endTimeReal = '';
		const timeLength = `${item['@tripTime']} min total`;
		const fare = `fare: ${item['@fare']}`;
		const tripId = key;

		return {tripId,startTime,startTimeReal,endTime,endTimeReal,timeLength,fares,fare,leg}

	});
}