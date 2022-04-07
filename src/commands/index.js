import Logger from 'js-logger';
import {
  requestBsa,
  requestCount,
  requestElevator,
  requestEtd,
  requestFare,
  requestRouteInfo,
  requestRoutes,
  requestRouteSchedule,
  requestSpecial,
  requestStationAccess,
  requestStationInfo,
  requestStations,
  requestStationSchedule,
  requestTrip,
} from '../actions';

class Commands {
  static instance = null;

  isInit = false;
  isIniting = false;
  dispatch = null;
  initPromise = null;

  static getInstance(dispatch) {
    if (this.instance == null) {
      this.instance = new Commands();
    }
    if (dispatch) {
      this.instance.dispatch = dispatch;
    }

    return this.instance;
  }

  constructor() {
    Logger.info('commands::ctor');
    // this.dispatch = dispatch;
    // this.init();
  }

  isInitialized() {
    return this.isInit || !this.isIniting;
  }

  init() {
    Logger.info('Commands::init()');
    this.isInit = false;
    this.isIniting = true;

    this.initPromise = Promise.all([
      this.dispatch(requestEtd('mcar')),
      this.dispatch(requestBsa()),
      this.dispatch(requestCount()),
      this.dispatch(requestElevator()),
      this.dispatch(requestRouteInfo(1)),
      this.dispatch(requestRoutes()),
      this.dispatch(requestTrip()),
      this.dispatch(requestFare()),
      this.dispatch(requestRouteSchedule()),
      this.dispatch(requestSpecial()),
      this.dispatch(requestStationSchedule()),
      this.dispatch(requestStationAccess()),
      this.dispatch(requestStationInfo()),
      this.dispatch(requestStations()),
    ]).finally(() => {
      this.isInit = true;
      this.isIniting = false;
    });

    return this.initPromise;
  }

  checkInit(cmd) {
    if (this.isIniting) {
      return this.initPromise.then(cmd);
    }
    if (!this.isInit) {
      return this.init().then(cmd);
    }
    return cmd();
  }

  setRTDStationAbbr(abbr) {
    Logger.info('Commands::setRTDStationAbbr()', abbr);
    // if (this.isIniting) {
    //   return this.initPromise.then(() => this.dispatch(requestEtd(abbr)));
    // }
    // return this.dispatch(requestEtd(abbr));

    return this.checkInit(() => this.dispatch(requestEtd(abbr)));
  }

  requestTripPlanning(originAbbr, destAbbr) {
    Logger.info('Commands::requestTripPlanning()', originAbbr, destAbbr);
    // Logger.info('Commands::requestTripPlanning()', originAbbr, destAbbr);
    // if (this.isIniting) {
    //   return this.initPromise.then(() =>
    //     this.dispatch(requestTrip(originAbbr, destAbbr))
    //   );
    // }

    // return this.dispatch(requestTrip(originAbbr, destAbbr));

    return this.checkInit(() =>
      this.dispatch(requestTrip(originAbbr, destAbbr))
    );
  }

  requestRouteInfo(route) {
    Logger.info('Commands::requestRouteInfo()', route);

    return this.checkInit(() => this.dispatch(requestRouteInfo(route)));
  }
}

const commands = (dispatch) => {
  const cmd = Commands.getInstance(dispatch);

  return cmd;
};

export { commands };
