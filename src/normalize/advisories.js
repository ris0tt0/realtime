import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

export const normalizeBsa = (json) => {
  const bsaSchema = new schema.Entity(
    'bsa',
    {},
    {
      idAttribute: (value, parent) => {
        return `id-${parent.bsa.indexOf(value)}`;
      },
    }
  );

  const normalized = normalize(json.root, {
    uri: uriSchema,
    bsa: [bsaSchema],
  });

  return normalized;
};

export const normalizeCount = (json) => {
  const normalized = normalize(json.root, {
    uri: uriSchema,
  });

  return normalized;
};
