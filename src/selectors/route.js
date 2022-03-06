import { createSelector } from 'reselect';

const getRoutesEntitySelector = (state) => state.jbart.routes.entities.routes;
const getRoutesResultSelector = (state) => state.jbart.routes.result;

export const getRoutesListSelector = createSelector(
  [getRoutesEntitySelector, getRoutesResultSelector],
  (routes, result) => {
    return routes[result.routes];
  }
);

export const getRoutesMapSelector = createSelector(
  [getRoutesListSelector],
  (list) => {
    return list.reduce((map, route) => {
      map.set(route.routeID, route);
      return map;
    }, new Map());
  }
);

const getRouteInfoEntitySelector = (state) => state.jbart.routeinfo.entities;
const getRouteInfoResultSelector = (state) => state.jbart.routeinfo.result;

export const getRouteInfoSelector = createSelector(
  [getRouteInfoEntitySelector, getRouteInfoResultSelector],
  (entity, result) => {
    const route = entity.routes[result.routes];
    const config = entity.config[route.config];

    return { ...route, config };
  }
);
