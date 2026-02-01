import { Store } from '@reduxjs/toolkit';
import { Commands } from '.';
import { RealTimeApi } from '../api';
import {
  BartRoute,
  BartStation,
  BartStationSchedule,
  BartStationScheduleItem,
  BartStationsETD,
  BartStationsETDFull,
  DB,
  RealTimeEstimates,
  SortStationsBy,
} from '../db';
import { RteDispatch } from '../store';
import {
  RteState,
  setAdvisories,
  setElevatorStatus,
  setRoutes,
  setRoutesByNumber,
  setRte,
  setStations,
  setStationSchedule,
  setTotalTrainsInService,
} from '../store/rte';
import { getSomeDayBefore } from '../utils';

export type CommandsImplParams = {
  api: RealTimeApi;
  db: DB;
  dispatch: RteDispatch;
  store: any;
};

class CommandsImpl implements Commands {
  api: RealTimeApi;
  db: DB;
  dispatch: RteDispatch;
  store: Store<RteState>;

  constructor({ api, db, dispatch, store }: CommandsImplParams) {
    this.api = api;
    this.db = db;
    this.dispatch = dispatch;
    this.store = store;
  }
  protected getRteMap() {
    const state = this.store.getState();

    return state.rte;
  }
  protected getStationsMap() {
    const state = this.store.getState();

    return state.stations;
  }
  protected async setRte(rte: RealTimeEstimates) {
    this.dispatch(setRte(rte));

    return null;
  }
  protected async setStations(stations: BartStation[]) {
    const map = stations.reduce(
      (retVal, station) => {
        retVal[station.abbr] = station;
        return retVal;
      },
      {} as Record<string, BartStation>,
    );

    this.dispatch(setStations(map));

    return null;
  }
  protected async setRoutes(routes: BartRoute[]) {
    const routeAbbr = routes.reduce(
      (retVal, route) => {
        retVal[route.abbr] = route;
        return retVal;
      },
      {} as Record<string, BartRoute>,
    );
    const routeNumber = routes.reduce(
      (retVal, route) => {
        retVal[route.routeID] = route;
        return retVal;
      },
      {} as Record<string, BartRoute>,
    );
    this.dispatch(setRoutes(routeAbbr));
    this.dispatch(setRoutesByNumber(routeNumber));

    return null;
  }
  protected async setStationSchedule(stationSchedule: BartStationSchedule) {
    const action = setStationSchedule(stationSchedule);
    this.dispatch(action);
    return null;
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
        const r = routesResult.root.routes.route.map((route: any) => {
          const [originStation, destinationStation] = route.abbr.split('-');
          return {
            ...route,
            originStation,
            destinationStation,
          } as BartRoute;
        });
        await this.db.setRoutes(r);
        this.setRoutes(r);
      }
    } else {
      this.setRoutes(routes);
    }
    await this.updateTrainsInServiceCount();
    await this.updateAdvisories();
    await this.updateElevatorStatus();
  };
  getStationDetails = async (stationId: string) => {
    const station = await this.db.getStationDetail(stationId);
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
  getStationSchedule = async (stationId: string, day: string) => {
    const schedule = await this.db.getStationSchedule(stationId, day);
    const reset = getSomeDayBefore(schedule?.date);

    if (schedule === null || reset) {
      const scheduleResult = await this.api.getStationSchedule(stationId, day);
      const id = `${stationId}-${day}`;
      const date: string = scheduleResult.root.date;
      const abbr: string = scheduleResult.root.station.abbr;
      const name: string = scheduleResult.root.station.name;
      const itemData = scheduleResult.root.station.item;

      const platforms = {} as Record<string, BartStationScheduleItem[]>;

      const items: BartStationScheduleItem[] = itemData.map((item: any) => {
        const bikeflag = item?.['@bikeflag'] ?? '';
        const line = item?.['@line'] ?? '';
        const load = item?.['@load'] ?? '';
        const origTime = item?.['@origTime'] ?? '';
        const platform = item?.['@platform'] ?? '';
        const trainHeadStation = item?.['@trainHeadStation'] ?? '';

        const result = {
          bikeflag,
          line,
          load,
          origTime,
          platform,
          trainHeadStation,
        };

        if (!platforms[platform]) {
          platforms[platform] = [];
        }
        platforms[platform].push(result);

        return result;
      });

      const data = { id, abbr, date, name, items, platforms };

      await this.db.setStationSchedule(data);

      return data;
    }

    return schedule;
  };

  getRouteDetails = async (routeNumber: string) => {
    const route = await this.db.getRouteDetail(routeNumber);
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

    return data;
  };
  updateStationRealTimeEstimates = async (
    stationId: string,
    platform?: number,
    direction?: string,
  ) => {
    const result = await this.getStationEstimates(
      stationId,
      platform,
      direction,
    );
    const stationsMap = this.getStationsMap();
    const rteMap = this.getRteMap();

    if (result.root.station) {
      const stations: BartStationsETDFull[] = result.root.station.map(
        (stn: BartStationsETD) => {
          const station = stationsMap[stn.abbr];
          const etd = stn.etd?.map((etd) => {
            const station: BartStation = stationsMap[etd.abbreviation];
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

      const original = rteMap[stationId] ?? null;

      if (original === null) {
        const rt = {
          id: stationId,
          sort: 'name' as SortStationsBy,
          data: stations[0],
          update: new Date().toISOString(),
        };
        this.setRte(rt);
      } else {
        const rt = {
          ...original,
          data: stations[0],
          update: new Date().toISOString(),
        };
        this.setRte(rt);
      }
      return stations;
    }

    return null;
  };

  updateElevatorStatus = async () => {
    const elevatorStatus = await this.api.getElevatorStatus();

    if (elevatorStatus.root?.bsa && elevatorStatus.root.bsa.length > 0) {
      const result = elevatorStatus.root.bsa.map((advisory: any) => {
        const retVal = advisory.description['#cdata-section'] ?? '';

        return retVal;
      });
      this.dispatch(setElevatorStatus(result));

      return result;
    }

    return [];
  };

  updateTrainsInServiceCount = async () => {
    const trainsInService = (await this.api.getTrainCount()) ?? NaN;
    this.dispatch(setTotalTrainsInService(trainsInService));

    return trainsInService;
  };

  updateAdvisories = async () => {
    const advisories = await this.api.getAdvisories();

    if (advisories.root?.bsa && advisories.root.bsa.length > 0) {
      const result = advisories.root.bsa.map((advisory: any) => {
        const retVal = advisory.description['#cdata-section'] ?? '';

        return retVal;
      });

      this.dispatch(setAdvisories(result));

      return result;
    }

    return [];
  };
}

export default CommandsImpl;
