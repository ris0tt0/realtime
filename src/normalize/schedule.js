import { normalize, schema } from 'normalizr';
import { uriSchema } from './common';

export const normalizeTrip = (json) => {
  //   Logger.info('normalizTrip::', json);
  const fairSchema = new schema.Entity(
    'fare',
    {},
    {
      idAttribute: (value) => `id-fair-${[...Object.values(value)].join('👍🏽')}`,
      processStrategy: (value) => {
        return {
          amount: value['@amount'],
          cardClass: value['@class'],
          name: value['@name'],
        };
      },
    }
  );
  const fairsSchema = new schema.Entity(
    'fares',
    { fare: [fairSchema] },
    {
      idAttribute: (value, parent) =>
        `id-fares-${[...Object.values(parent)].join('-')}`,
      processStrategy: (value) => {
        return {
          level: value['@level'],
          fare: value['fare'],
        };
      },
    }
  );
  const legSchema = new schema.Entity(
    'leg',
    {},
    {
      idAttribute: (value) => `id-leg-${[...Object.values(value)].join('-')}`,
      processStrategy: (value) => {
        return {
          order: value['@order'],
          origin: value['@origin'],
          destination: value['@destination'],
          origTimeMin: value['@origTimeMin'],
          origTimeDate: value['@origTimeDate'],
          destTimeMin: value['@destTimeMin'],
          destTimeDate: value['@destTimeDate'],
          line: value['@line'],
          bikeflag: value['@bikeflag'],
          trainHeadStation: value['@trainHeadStation'],
          load: value['@load'],
        };
      },
    }
  );

  const tripSchema = new schema.Entity(
    'trip',
    { fares: fairsSchema, leg: [legSchema] },
    {
      idAttribute: (value) => `id-leg-${[...Object.values(value)].join('-')}`,
      processStrategy: (value) => {
        return {
          origin: value['@origin'],
          destination: value['@destination'],
          fare: value['@fare'],
          origTimeMin: value['@origTimeMin'],
          origTimeDate: value['@origTimeDate'],
          destTimeMin: value['@destTimeMin'],
          destTimeDate: value['@destTimeDate'],
          clipper: value['@clipper'],
          tripTime: value['@tripTime'],
          fares: value['fares'],
          leg: value['leg'],
        };
      },
    }
  );
  const requestSchema = new schema.Entity(
    'request',
    { trip: [tripSchema] },
    {
      idAttribute: (value, parent) =>
        `id-leg-${[...Object.values(parent)].join('-')}`,
    }
  );
  const scheduleSchema = new schema.Entity(
    'schedule',
    { request: requestSchema },
    {
      idAttribute: (value, parent) =>
        `id-leg-${[...Object.values(parent)].join('-')}`,
    }
  );

  const normalized = normalize(json.root, {
    uri: uriSchema,
    schedule: scheduleSchema,
  });

  return normalized;
};

export const normalizeFare = (json) => json;
export const normalizeHoliday = (json) => json;
export const normalizeRouteSched = (json) => json;
export const normalizeScheds = (json) => json;
export const normalizeSpecial = (json) => json;
export const normalizeStnSched = (json) => json;
