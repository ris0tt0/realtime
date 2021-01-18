import Logger from 'js-logger';
import { normalize, schema } from 'normalizr';

export const normalizeStations = (json) => {
  const stationSchema = new schema.Entity('stations');
  const idAdded = json.root.stations.station.map((item) => ({
    ...item,
    id: item.abbr,
  }));
  const normalized = normalize(idAdded, [stationSchema]);
  return normalized;
};

export const normalizeAdvisories = (json) => {
  const bsaSchema = new schema.Entity('bsa');

  const normalized = normalize(json.root, { bsa: [bsaSchema] });
  return normalized;
};

export const normalizeTrainCount = (json) => {
  const trainCountSchema = new schema.Entity(
    'traincount',
    { uri: uriSchema },
    { idAttribute: (train) => train.time }
  );
  const normalized = normalize(json.root, trainCountSchema);
  return normalized;
};

const uriSchema = new schema.Entity(
  'uri',
  {},
  {
    idAttribute: () => 'uriId',
  }
);

const dateTimeIdAttribute = (data) => `${data.date}-${data.time}`;
const dateTimeParentIdAttribute = (value, parent, key) =>
  `${parent.date}-${parent.time}`;
const atIdAttribue = (value, parent) => parent['@id'];
const cdataProcessStrategy = (value) => value['#cdata-section'];
export const normalizeElevators = (json) => {
  const descriptionSchema = new schema.Entity(
    'description',
    {},
    {
      processStrategy: cdataProcessStrategy,
      idAttribute: atIdAttribue,
    }
  );
  const smsTextSchema = new schema.Entity(
    'smstext',
    {},
    {
      processStrategy: cdataProcessStrategy,
      idAttribute: atIdAttribue,
    }
  );
  const bsaSchema = new schema.Entity(
    'bsa',
    {
      description: descriptionSchema,
      sms_text: smsTextSchema,
    },
    {
      idAttribute: dateTimeParentIdAttribute,
    }
  );
  const rootSchema = new schema.Entity(
    'elevatorstatus',
    { uri: uriSchema, bsa: [bsaSchema] },
    { idAttribute: dateTimeIdAttribute }
  );
  const normalized = normalize(json.root, rootSchema);
  return normalized;
};

export const normalizeRealTimeEstimates = (json) => {
  const estimateSchema = new schema.Entity('estimate', undefined, {
    idAttribute: (estimate) => {
      return Object.values(estimate).join('-');
    },
  });
  const uriSchema = new schema.Entity('uri', undefined, {
    idAttribute: (uri) => 'uriId',
  });
  const etdSchema = new schema.Entity(
    'etd',
    { estimate: [estimateSchema] },
    { idAttribute: (etd) => etd.abbreviation }
  );
  const stationSchema = new schema.Entity(
    'station',
    { etd: [etdSchema] },
    { idAttribute: (station) => station.abbr }
  );
  const responseSchema = new schema.Entity(
    'response',
    { uri: uriSchema, station: [stationSchema] },
    { idAttribute: (response) => response.time }
  );
  const normalized = normalize(json.root, responseSchema);

  return normalized;
};
