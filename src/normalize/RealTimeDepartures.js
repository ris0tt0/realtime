import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

export const normalizeEtd = (json) => {
  const estimateSchema = new schema.Entity(
    'estimate',
    {},
    {
      idAttribute: (value, parent) => {
        return `id-${parent.abbreviation}-${parent.estimate.indexOf(value)}`;
      },
    }
  );
  const etdSchema = new schema.Entity(
    'estimatedTimeDepature',
    {
      estimate: [estimateSchema],
    },
    {
      idAttribute: (value, parent) => {
        // Logger.info('parent', parent, '---', value);
        return `id-${parent.etd.indexOf(value)}`;
      },
    }
  );
  const stationSchema = new schema.Entity(
    'station',
    { etd: [etdSchema] },
    { idAttribute: (value, parent) => `id-${parent.station.indexOf(value)}` }
  );

  const normalized = normalize(json.root, {
    uri: uriSchema,
    station: [stationSchema],
  });

  return normalized;
};
