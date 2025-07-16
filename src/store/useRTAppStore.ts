import { create } from 'zustand';
import { BartRoute, BartStation } from '../db';

export type SortStationsBy = 'name' | 'platform';

export type RTAppStore = {
  totalTrainsInService: number;
  rteUpdatedTimestamp: Date;
  rteSortBy: SortStationsBy;
  routes: BartRoute[];
  stations: BartStation[];
  routesMap: Record<string, BartRoute>;
  stationsMap: Record<string, BartStation>;
  setRteSortBy: (sortBy: SortStationsBy) => void;
  setRoutes: (routes: BartRoute[]) => void;
  setStations: (stations: BartStation[]) => void;
  setTotalTrainsInService: (count: number) => void;
  setRteUpdatedTimestamp: (timestamp: Date) => void;
};

export const useRTAppStore = create<RTAppStore>((set) => ({
  totalTrainsInService: 0,
  rteUpdatedTimestamp: new Date(),
  rteSortBy: 'name',
  routes: [],
  stations: [],
  routesMap: {},
  stationsMap: {},
  setRteSortBy: (sortBy: SortStationsBy) => {
    set(() => ({ rteSortBy: sortBy }));
  },
  setTotalTrainsInService: (count: number) => {
    set(() => ({ totalTrainsInService: count }));
  },
  setRteUpdatedTimestamp: (timestamp: Date) => {
    set(() => ({ rteUpdatedTimestamp: timestamp }));
  },
  setRoutes: (routes: BartRoute[]) => {
    set(() => {
      const routesMap = routes.reduce(
        (retVal, route) => {
          retVal[route.routeId] = route;
          retVal[route.number] = route;
          retVal[route.abbr] = route;

          return retVal;
        },
        {} as Record<string, BartRoute>,
      );
      return { routes, routesMap };
    });
  },
  setStations: (stations: BartStation[]) => {
    set(() => {
      const stationsMap = stations.reduce(
        (retVal, station) => {
          retVal[station.abbr] = station;
          return retVal;
        },
        {} as Record<string, BartStation>,
      );
      return { stations, stationsMap };
    });
  },
}));
