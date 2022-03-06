import Logger from 'js-logger';
import { requestEtd, requestRouteInfo, requestTrip } from '../actions';

const commands = (dispatch, state) => {
  return {
    init: () => {
      Logger.info('commands::init()', dispatch);
    },
    setRTDStationAbbr: (abbr) => {
      return dispatch(requestEtd(abbr));
    },
    requestTripPlanning: (originAbbr, destAbbr) => {
      return dispatch(requestTrip(originAbbr, destAbbr));
    },
    requestRouteInfo: (route) => {
      return dispatch(requestRouteInfo(route));
    },
  };
};

export { commands };
