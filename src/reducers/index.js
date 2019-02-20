import Logger from 'js-logger'
import {combineReducers} from 'redux';
import {
	RECIEVE_STATIONS,
	RECIEVE_TRAIN_COUNT,
	RECIEVE_RTE,
	RECIEVE_TRIP_PLANNING,
	SHOW_SORT_SELECTION,
	SET_STARTING_ABBR,
	SET_DESTINATION_ABBR,
	SET_TRIP_PLANNER_DETAILS,
	RECIEVE_ROUTES,
	} from '../actions/';

const rtdInitialState = 
{
	entities:{
		estimate:{
			id:{
				bikeflag:'',
				color:'',
				delay:'',
				direction:'',
				hexcolor:'',
				length:'',
				minutes:'',
				platform:'',
			},
		},
		etd:{
			id:{
				abbreviation:'',
				destination:'',
				estimate:['id'],
				limited:'',
			}
		},
		response:{
			id:{
				'@id':'',
				date:'',
				message:'',
				station:'id',
				time:'',
				uri:'id'
			}
		},
		station:{
			id:{
				abbr:'',
				name:'',
				etd:['id'],
			}
		},
		uri:{
			id:{'#data-selection':''}
		}
	},
	result:'id'
};

function rtd(state = rtdInitialState, action)
{
	switch(action.type)
	{
		case RECIEVE_RTE:
			return {...action.data};
		default:
			return {...state};
	}
}

const statationsInitialState = {
	entities:{
		stations:{
			'12TH':{
				abbr: '',
				address: '',
				city: '',
				county: '',
				gtfs_latitude:'',
				gtfs_longitude:'',
				id: '',
				name: '',
				state: '',
				zipcode: '',
			}
		}
	},
	result:['12TH'],
};

function stations(state = statationsInitialState, action)
{
	// Logger.info(`reducer::stations`);
	
	switch(action.type)
	{
		case RECIEVE_STATIONS:
			const stations = action.stations;
			return {...stations};
		default:
			return {...state};
	}
}

const trainCountInitailState = {
	result:'id',
	entities:{
		traincount:{
			id:{
				date:'',
				message:'',
				time:'',
				traincount:'unknown',
				uri:'id'
			}
		},
		uri:{
			id:{'#data-selection':''}
		}
	}
};
function traincount(state = trainCountInitailState, action)
{
	switch(action.type)
	{
		case RECIEVE_TRAIN_COUNT:
			return {...action.data};
		default:
			return {...state};
	}
}

function sortSelection(state = '',action)
{
	switch(action.type)
	{
		case SHOW_SORT_SELECTION:
			return action.selection === '' ? 'named' : action.selection;
		default:
			return state;
	}
}

function destinationAbbr(state = '', action)
{
	switch(action.type)
	{
		case SET_DESTINATION_ABBR:
			return action.abbr;
		default:
			return state;
	}
}

function startingAbbr(state = '', action)
{
	switch(action.type)
	{
		case SET_STARTING_ABBR:
			return action.abbr;
		default:
			return state;
	}
}

export const defaultTripPlannerTripObject = 
{
	'@origin':'12TH',
	'@destination':'12TH',
	'@fare':'',
	'@origTimeMin':'',
	'@origTimeDate':'',
	'@destTimeMin':'',
	'@destTimeDate':'',
	'@clipper':'',
	'@tripTime':'',
	'@co2':'',
	fares:{},
	leg:['legId'],
}
const tripPlannerInitialState = 
{
	entities:{
		request:{
			requestId:{
				trip:['tripId']
			}
		},
		fare:{},
		fares:{},
		leg:{
			legId:{
				'@bikeflag': '',
				'@destTimeDate': '',
				'@destTimeMin': '',
				'@destination': '12TH',
				'@line': '',
				'@load': '',
				'@order': '',
				'@origTimeDate': '',
				'@origTimeMin': '',
				'@origin': '12TH',
				'@trainHeadStation': '',
				'@trainId': '',
				'@trainIdx': '',
				'@transfercode': '',
			},
		},
		response:{
			responseId:{
				schedule:'scheduleId'
			}
		},
		schedule:{
			scheduleId:{
				after: '',
				before: '',
				date: '',
				request: 'requestId',
				time: '',
			}
		},
		trip:{
			tripId:{...defaultTripPlannerTripObject},
		}
	},
	result:'responseId'
};

function tripplanner(state = tripPlannerInitialState, action)
{
	switch(action.type)
	{
		case RECIEVE_TRIP_PLANNING:
			return {...action.data};
		default:
			return {...state};
	}
}

function tripPlannerDetailsId(state = 'tripId', action)
{
		switch(action.type)
		{
			case SET_TRIP_PLANNER_DETAILS:
				return action.tripId;
			default:
				return state;
		}
}

const routesInitialState = {
	entities:
	{
		route:{
			abbr:'',
			color:'',
			hexcolor:'',
			name:'',
			number:'',
			routeID:'',
		},
		routes:
		{
			id:['id'],
		},
	},
	result:'id',
};

function routes(state = routesInitialState, action)
{
	switch(action.type)
	{
		case RECIEVE_ROUTES:
			return {...action.routes};
		default:
			return {...state};
	}
}

const gbart = combineReducers(
{
	rtd,
	routes,
	stations,
	traincount,
	sortSelection,
	destinationAbbr,
	startingAbbr,
	tripplanner,
	tripPlannerDetailsId,
});

export default gbart;