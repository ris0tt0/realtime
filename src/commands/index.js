import Logger from 'js-logger';
import { requestEtd } from '../actions';

const commands = (dispatch, state) => {
  return {
    init: () => {
      Logger.info('commands::init()', dispatch);
    },
    setRTDStationAbbr: (abbr) => {
      return dispatch(requestEtd(abbr));
    },
  };
};

export { commands };
