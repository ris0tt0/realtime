import Logger from 'js-logger';
import { Commands } from '.';
import { RealTimeApi } from '../api';
import { BartRoute, BartStation, BartStationsETD, DB } from '../db';
import { BartStationsETDFull } from '../hooks/useRealTimeEstimates';

export type CommandsImplParams = {
  api: RealTimeApi;
  db: DB;
  stationsMap: Record<string, BartStation>;
  setRTE: (rte: BartStationsETDFull[] | null) => void;
  setRoutes: (routes: BartRoute[]) => void;
  setStations: (stations: BartStation[]) => void;
  setTotalTrainsInService: (total: number) => void;
  setRteUpdatedTimestamp: (timestamp: Date) => void;
};

class CommandsImpl implements Commands {
  api: RealTimeApi;
  db: DB;

  private setRTE: (rte: BartStationsETDFull[] | null) => void;
  private setRoutes: (routes: BartRoute[]) => void;
  private setStations: (stations: BartStation[]) => void;
  private setTotalTrainsInService: (total: number) => void;
  private setRteUpdatedTimestamp: (timestamp: Date) => void;

  private stationsMap: Record<string, BartStation>;

  private rteRefresh: any | null = null;

  constructor({
    api,
    db,
    stationsMap,
    setRTE,
    setRoutes,
    setStations,
    setTotalTrainsInService,
    setRteUpdatedTimestamp,
  }: CommandsImplParams) {
    this.api = api;
    this.db = db;
    this.stationsMap = stationsMap;
    this.setRTE = setRTE;
    this.setRoutes = setRoutes;
    this.setStations = setStations;
    this.setTotalTrainsInService = setTotalTrainsInService;
    this.setRteUpdatedTimestamp = setRteUpdatedTimestamp;
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
    await this.updateTrainsInserviceCount();
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
  protected getStationEstimates = async (
    stationId: string,
    platform?: number,
    direction?: string,
  ) => {
    const data = await this.api.getRealTimeEstimates(
      stationId,
      platform,
      direction,
    );

    this.setRteUpdatedTimestamp(new Date());

    Logger.info('getStationEstimates', stationId, platform, direction, data);

    return data;
  };
  udpateStationRealTimeEstimates = async (
    stationId: string,
    platform?: number,
    direction?: string,
  ) => {
    const result = await this.getStationEstimates(
      stationId,
      platform,
      direction,
    );

    if (result.root.station) {
      const stations: BartStationsETDFull[] = result.root.station.map(
        (stn: BartStationsETD) => {
          const station = this.stationsMap[stn.abbr];
          const etd = stn.etd?.map((etd) => {
            const station: BartStation = this.stationsMap[etd.abbreviation];
            return {
              ...etd,
              station,
            };
          });
          return {
            ...stn,
            station,
            etd,
          };
        },
      );
      Logger.info('RTEDetail', stationId, result.root, stations);
      this.setRTE(stations);
      return stations;
    }

    return null;
  };

  updateTrainsInserviceCount = async () => {
    const trainsInService = (await this.api.getTrainCount()) ?? 0;
    this.setTotalTrainsInService(trainsInService);

    return trainsInService;
  };
}

export default CommandsImpl;
