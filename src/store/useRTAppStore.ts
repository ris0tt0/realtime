import { create } from 'zustand';
import { BartRoute, BartStation } from '../db';

export type RTAppStore = {
  routes: BartRoute[];
  stations: BartStation[];
  routesMap: Record<string, BartRoute>;
  stationsMap: Record<string, BartStation>;
  setRoutes: (routes: BartRoute[]) => void;
  setStations: (stations: BartStation[]) => void;
};

export const useRTAppStore = create<RTAppStore>((set) => ({
  routes: [],
  stations: [],
  routesMap: {},
  stationsMap: {},
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
