import Logger from 'js-logger'
import {normalize, schema} from 'normalizr';

export const GET_ETA = 'get eta';
export const GET_STATIONS = 'get stations';
export const RECIEVE_STATIONS = 'receive stations';
export const RECIEVE_TRAIN_COUNT = 'recieve train count';
export const RECIEVE_RTE = 'receieve real time estimate';
export const RECIEVE_TRIP_PLANNING = 'receieve trip planning';
export const SET_STARTING_ABBR = 'set starting abbr';
export const SET_DESTINATION_ABBR = 'set destination abbr';
export const SET_TRIP_PLANNER_DETAILS = 'set trip planner details';
export const SET_TRIP_PLANNER_LEG_IDS = 'set trip planner leg ids;';

export const SHOW_SORT_SELECTION = 'show sort selection';

export function getETA(station = {})
{
	return {type:GET_ETA, station};
}

export function getStations()
{
	return {type:GET_STATIONS};
}

export function recieveStations(stations = {})
{
	return { type:RECIEVE_STATIONS,stations};
}
export function recieveTrainCount(data)
{
	return { type:RECIEVE_TRAIN_COUNT,data};
}
export function recieveRTE(eta = {})
{
	return { type: RECIEVE_RTE, eta};
}
export function recieveTripPlanning(data = {})
{
	return {type:RECIEVE_TRIP_PLANNING, data};
}

export function showSortSelection(selection = '')
{
	return {type: SHOW_SORT_SELECTION,selection};
}

export function setStartingAbbr(abbr)
{
	return {type: SET_STARTING_ABBR, abbr}
}

export function setDestinationAbbr(abbr)
{
	return {type:SET_DESTINATION_ABBR, abbr}
}

export function setTripPlannerDetails(tripId)
{
	// Logger.info(`setTripPlannerDetails ${tripId}`);

	return {type:SET_TRIP_PLANNER_DETAILS,tripId};
}

export function setTripPlannerLegIds(legIds)
{
	return {type:SET_TRIP_PLANNER_LEG_IDS,legIds};
}

const DEV_KEY = 'MW9S-E7SL-26DU-VV8V';

export function fetchStations()
{
	return dispatch =>
	{
		Logger.info(`dispatch fetch stations`);
		return fetch(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=${DEV_KEY}&json=y`)
      .then( response => response.json() )
			.then( json =>
			{
				const stationSchema = new schema.Entity('stations');
				const stationListSchema = new schema.Array(stationSchema);
				// add id.
				const idAdded = json.root.stations.station.map(item => { return {...item,id:item.abbr}} );
				// normalize the station data.
				const normalized = normalize(idAdded, stationListSchema);

				dispatch(recieveStations(normalized));
			});
	}
}

export function fetchTrainCount()
{
	return dispatch =>
	{
		return fetch(`http://api.bart.gov/api/bsa.aspx?cmd=count&key=${DEV_KEY}&json=y`)
      .then( response => response.json() )
      .then( json => {
				const uriSchema = new schema.Entity('uri',undefined,{idAttribute: uri => 'uriId'});
				const trainCountSchema = new schema.Entity('traincount',{uri:uriSchema},{idAttribute:train => train.time});
				const data = normalize(json.root,trainCountSchema);
				
				dispatch(recieveTrainCount(data));
			} );
	}
}

export function fetchRealTimeEstimates(station)
{
	return (dispatch) =>
	{
		return fetch(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${DEV_KEY}&json=y`)
			.then( response => response.json() )
			.then( json => {

				Logger.info(`fetchRealTimeEstimates(${station})`);

				const estimateSchema = new schema.Entity('estimate',undefined,{idAttribute: estimate => 
				{
					const {color,bikeflag,delay,direction,hexcolor,length,minutes,platform} = estimate;

					return `${color}-${bikeflag}-${delay}-${direction}-${hexcolor}-${length}-${minutes}-${platform}`;
				} });
				const etdSchema = new schema.Entity('etd',{estimate:[estimateSchema]},{idAttribute: etd => etd.abbreviation})
				const stationSchema = new schema.Entity('station',{etd:[etdSchema]},{idAttribute: station => station.abbr });
				const responseSchema = new schema.Entity('response',{station:[stationSchema]},{idAttribute:response => response.time});
				const normalized = normalize(json.root, responseSchema);

				dispatch(recieveRTE(normalized))
			} );
	}
}

export function fetchTripPlanning()
{
	Logger.info(`fetchTripPlanning`);
	return (dispatch,getState) =>
	{
		const {startingAbbr,destinationAbbr} = getState();

		Logger.info(`dispatch fetchTripPlanning ${startingAbbr} ${destinationAbbr}`);

		if(startingAbbr && startingAbbr.length > 0 && destinationAbbr && destinationAbbr.length > 0)
		{
			return fetch(`http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${startingAbbr}&dest=${destinationAbbr}&date=today&time=now&key=${DEV_KEY}&b=1&a=4&json=y`)
			.then( response => response.json() )
			.then( json => {

				// start to normalize the json response.
				const fareSchema = new schema.Entity('fare',undefined,{idAttribute: value => value['@name']});
				const faresSchema = new schema.Entity('fares',{fare:[fareSchema]},{idAttribute: value => `${value['@level']}-${value.fare.length}`});
				const legSchema = new schema.Entity('leg',undefined,{idAttribute: value => value['@trainId']});
				const tripSchema = new schema.Entity('trip',{fares:faresSchema,leg:[legSchema]},{idAttribute: value => `${value['@origTimeMin']}-${value['@destTimeMin']}`});
				const requestSchema = new schema.Entity('request',{trip:[tripSchema]},{idAttribute: value => 'requested'});
				const scheduleSchema = new schema.Entity('schedule',{request:requestSchema},{idAttribute: value => `${value.time}-${value.date}`});
				const responseSchema = new schema.Entity('response',{schedule:scheduleSchema},{idAttribute: value => `${value.origin}-${value.destination}`});

				const normalized = normalize(json.root, responseSchema);

				dispatch(recieveTripPlanning(normalized));
			});
		}
	}
}