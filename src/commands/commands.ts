import Logger from 'js-logger';
import { Commands } from '.';
import { RealTimeApi } from '../api';
import { BartRoute, BartRouteDetail, BartStation, DB } from '../db';

export type CommandsImplParams = {
  api: RealTimeApi;
  db: DB;
  setRoutes: (routes: BartRoute[]) => void;
  setStations: (stations: BartStation[]) => void;
};

class CommandsImpl implements Commands {
  api: RealTimeApi;
  db: DB;
  private setRoutes: (routes: BartRoute[]) => void;
  private setStations: (stations: BartStation[]) => void;

  constructor({ api, db, setRoutes, setStations }: CommandsImplParams) {
    this.api = api;
    this.db = db;
    this.setRoutes = setRoutes;
    this.setStations = setStations;
  }

  init = async () => {
    await this.api.init();
    await this.db.init();
    await this.initBartData();

    return true;
  };

  private initBartData = async () => {
    const stations = await this.db.getStations();
    if (stations === null) {
      const stationsResult = await this.api.getStations();
      if (stationsResult.root.stations?.station) {
        await this.db.setStations(stationsResult.root.stations.station);
        this.setStations(stationsResult.root.stations.station);
      }
    } else {
      this.setStations(stations);
    }
    const routes = await this.db.getRoutes();
    if (routes === null) {
      const routesResult = await this.api.getRoutes();
      if (routesResult.root.routes?.route) {
        await this.db.setRoutes(routesResult.root.routes.route);
        this.setRoutes(routesResult.root.routes.route);
      }
    } else {
      this.setRoutes(routes);
    }
  };
  getStationDetails = async (stationId: string) => {
    const station = await this.db.getStationDetail(stationId);
    Logger.info('getStationDetails', stationId, station);
    if (station === null) {
      const stationResult = await this.api.getStationDetail(stationId);
      if (stationResult.root.stations.station) {
        const requestData = stationResult.root.stations.station;
        const attraction = requestData.attraction?.['#cdata-section'] ?? '';
        const cross_street = requestData.cross_street?.['#cdata-section'] ?? '';
        const food = requestData.food?.['#cdata-section'] ?? '';
        const intro = requestData.intro?.['#cdata-section'] ?? '';
        const link = requestData.link?.['#cdata-section'] ?? '';
        const shopping = requestData.shopping?.['#cdata-section'] ?? '';

        const data = {
          ...requestData,
          attraction,
          cross_street,
          food,
          intro,
          link,
          shopping,
        };

        await this.db.setStationDetail(data);
        return data;
      }
    }
    return station;
  };
  getRouteDetails = async (routeNumber: string) => {
    const route = await this.db.getRouteDetail(routeNumber);
    Logger.info('getRouteDetails', routeNumber, route);
    if (route == null) {
      const routeResult = await this.api.getRouteDetail(routeNumber);
      if (routeResult.root.routes.route) {
        const data = routeResult.root.routes.route;
        await this.db.setRouteDetail(data);
        return data;
      }
    }
    return route;
  };
  getStationEstimates = async (
    stationId: string,
    platform?: number,
    direction?: string,
  ) => {
    const data = await this.api.getRealTimeEstimates(
      stationId,
      platform,
      direction,
    );

    Logger.info('getStationEstimates', stationId, platform, direction, data);

    return data;
  };
}

export default CommandsImpl;
