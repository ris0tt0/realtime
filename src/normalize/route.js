import Logger from 'js-logger';
import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

export const normalizeRouteInfo = (json) => json;
export const normalizeRoutes = (json) => {
  const routesSchema = new schema.Entity(
    'routes',
    {},
    {
      idAttribute: (value, parent) => {
        // Logger.info('----------', value, parent);
        return 'routes-id';
        //   return `id-${parent.stations.indexOf(value)}`;
      },
      processStrategy: (value, parent, key) => {
        // Logger.info('2----------', value, parent, key);
        return value.route;
      },
    }
  );

  const normalized = normalize(json.root, {
    uri: uriSchema,
    routes: routesSchema,
  });

  return normalized;
};
