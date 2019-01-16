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
	} from '../actions/';

function realTimeDepartures(state = {}, action)
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

const trainCountInitailState = {result:'',entities:{traincount:{},uri:{}}};
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
			Logger.info(`destinationAbbr: ${action.abbr}`);
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
			Logger.info(`startingAbbr: ${action.abbr}`)
			return action.abbr;
		default:
			return state;
	}
}
const tripPlannerInitialState = {entities:{request:{}},result:''};
function tripPlanner(state = tripPlannerInitialState, action)
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
				Logger.info(`trip planner details tripId: ${action.tripId}`);
				Logger.info(action);
				return action.tripId;
			default:
				return state;
		}
}

// function tripPlannerLegIds(state = [], action)
// {
// 	switch(action.type)
// 	{
// 		case SET_TRIP_PLANNER_LEG_IDS:
// 			return [action.legIds];
// 		default:
// 			return [...state];
// 	}
// }

const gbart = combineReducers(
{
	realTimeDepartures,
	stations,
	traincount,
	sortSelection,
	destinationAbbr,
	startingAbbr,
	tripPlanner,
	tripPlannerDetailsId,
	// tripPlannerLegIds,
});

export default gbart;