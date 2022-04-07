import { createSelector } from 'reselect';

const getRoutesEntitySelector = (state) => state.jbart.routes.entities;
const getRoutesResultSelector = (state) => state.jbart.routes.result;

export const getRoutesListSelector = createSelector(
  [getRoutesEntitySelector, getRoutesResultSelector],
  (entities, result) => {
    if (entities?.routes[result?.routes]) {
      return entities?.routes[result?.routes];
    }
    return [];
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
    if (!result) {
      return {};
    }
    const route = entity.routes[result.routes];
    const config = entity.config[route.config];

    return { ...route, config };
  }
);
