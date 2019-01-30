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
	entities:
	{
		station:
		{
			sid:
			{
				etd:[]
			}
		},
		response:
		{
			sid:
			{
				station:['sid']
			}
		}
	},
	result:'sid'
};

function rtd(state = rtdInitialState, action)
{
	switch(action.type)
	{
		case RECIEVE_RTE:
			return {...action.eta};
		default:
			return {...state};
	}
}

const statationsInitialState = {entities:{stations:{}},result:[]};

function stations(state = statationsInitialState, action)
{
	Logger.info(`reducer::stations`);
	
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
				traincount:'unknown',
				uri:'id'
			}
		},
		uri:{id:''}
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

const tripPlannerInitialState = 
{
	entities:
	{
		request:
		{
			requestId:
			{
				trip:[]
			}
		},
		fare:{},
		fares:{},
		leg:{},
		response:
		{
			id:
			{
				schedule:'id'
			}
		},
		schedule:
		{
			id:{request:'requestId'}
		},
		trip:
		{
			id:{leg:[]}
		}
	},
	result:'id'
};
function tripplanner(state = tripPlannerInitialState, action)
{
	switch(action.type)
	{
		case RECIEVE_TRIP_PLANNING:
			return {...action.data}
		default:
			return {...state};
	}
}

function tripPlannerDetailsId(state = '', action)
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
		route:{},
		routes:
		{
			id:[],
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