import { create } from 'zustand';
import { BartRoute, BartStation } from '../db';
import { BartStationsETDFull } from '../hooks/useRealTimeEstimates';

export type SortStationsBy = 'name' | 'platform';

export type RTAppStore = {
  totalTrainsInService: number;
  realTimeEstimates: BartStationsETDFull[] | null;
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
  setRealTimeEstimates: (stations: BartStationsETDFull[] | null) => void;
};

export const useRTAppStore = create<RTAppStore>((set) => ({
  totalTrainsInService: 0,
  realTimeEstimates: null,
  rteUpdatedTimestamp: new Date(),
  rteSortBy: 'name',
  routes: [],
  stations: [],
  routesMap: {},
  stationsMap: {},
  setRealTimeEstimates: (stations: BartStationsETDFull[] | null) => {
    set(() => ({ realTimeEstimates: stations }));
  },
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
