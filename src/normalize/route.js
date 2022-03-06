import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

export const normalizeRouteInfo = (json) => {
  const configSchema = new schema.Entity(
    'config',
    {},
    {
      idAttribute: () => {
        return 'config-id';
      },
      processStrategy: (value) => {
        return value.station;
      },
    }
  );
  const routesSchema = new schema.Entity(
    'routes',
    { config: configSchema },
    {
      idAttribute: () => {
        return 'routes-id';
      },
      processStrategy: (value) => {
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
export const normalizeRoutes = (json) => {
  const routesSchema = new schema.Entity(
    'routes',
    {},
    {
      idAttribute: () => {
        return 'routes-id';
      },
      processStrategy: (value) => {
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
