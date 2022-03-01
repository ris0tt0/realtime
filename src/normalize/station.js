import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

// export const normalizeBsa = (json) => {
//   const bsaSchema = new schema.Entity(
//     'bsa',
//     {},
//     {
//       idAttribute: (value, parent) => {
//         return `id-${parent.bsa.indexOf(value)}`;
//       },
//     }
//   );

//   const normalized = normalize(json.root, {
//     uri: uriSchema,
//     bsa: [bsaSchema],
//   });

//   return normalized;
// };

export const normalizeStnAccess = (json) => json;
export const normalizeStnInfo = (json) => json;
export const normalizeStns = (json) => {
  const stnSchema = new schema.Entity(
    'stations',
    {},
    {
      idAttribute: (value, parent) => {
        // Logger.info('----------', value, parent);
        return 'station-id';
        //   return `id-${parent.stations.indexOf(value)}`;
      },
      processStrategy: (value, parent, key) => {
        // Logger.info('2----------', value, parent, key);
        return value.station;
      },
    }
  );

  const normalized = normalize(json.root, {
    uri: uriSchema,
    stations: stnSchema,
  });

  return normalized;
};
