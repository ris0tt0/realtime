import {createSelector} from 'reselect'
import Logger from 'js-logger';

const getTrainCountRaw = ({traincount}) => traincount.entities.traincount[traincount.result];

export const getTrainCountNumber = createSelector([getTrainCountRaw], count =>
{
	if( count === undefined) return 'unknown';

	return count.traincount;
});


const getStations = ({stations}) => stations.entities.stations;
const getStationResult = ({stations}) => stations.result;
/**
 * returns an array list of stations.
 */
export const getStationArray = createSelector(
	[getStations,getStationResult],
	(data,stations) => stations.map(name => data[name]) );