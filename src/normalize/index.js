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

function legProcessStrategy(value) {
  return {
    bikeflag: value['@bikeflag'],
    destTimeDate: value['@destTimeDate'],
    destTimeMin: value['@destTimeMin'],
    destination: value['@destination'],
    line: value['@line'],
    load: value['@load'],
    order: value['@order'],
    origTimeDate: value['@origTimeDate'],
    origTimeMin: value['@origTimeMin'],
    origin: value['@origin'],
    trainHeadStation: value['@trainHeadStation'],
  };
}

function legIdAttribute(value) {
  return `${value['@origin']} ${value['@destination']} ${value['@origTimeDate']} ${value['@origTimeMin']} ${value['@destTimeDate']} ${value['@destTimeMin']}`;
}

function fareProcessStrategy(value) {
  return {
    amount: value['@amount'],
    type: value['@class'],
    name: value['@name'],
  };
}
function fareIdAttribute(value) {
  return `${value['@amount']} ${value['@class']} ${value['@name']}`;
}

function faresProcessStrategy(value) {
  return {
    level: value['@level'],
    fare: value.fare,
  };
}

function faresIdAttribute(value) {
  return `${value['@level']}`;
}

function tripProcessStrategy(value) {
  return {
    clipper: value['@clipper'],
    destTimeDate: value['@destTimeDate'],
    destTimeMin: value['@destTimeMin'],
    destination: value['@destination'],
    fare: value['@fare'],
    origTimeDate: value['@origTimeDate'],
    origTimeMin: value['@origTimeMin'],
    origin: value['@origin'],
    tripTime: value['@tripTime'],
    fares: value['fares'],
    leg: value['leg'],
  };
}

function tripIdAttribute(value) {
  return `${value['@origin']} ${value['@destination']} ${value['@origTimeDate']} ${value['@origTimeMin']} ${value['@destTimeDate']} ${value['@destTimeMin']}`;
}

export const normalizeTripPlanning = (json) => {
  const fareSchema = new schema.Entity(
    'fare',
    {},
    {
      idAttribute: fareIdAttribute,
      processStrategy: fareProcessStrategy,
    }
  );
  const faresSchema = new schema.Entity(
    'fares',
    { fare: [fareSchema] },
    {
      idAttribute: faresIdAttribute,
      processStrategy: faresProcessStrategy,
    }
  );
  const legSchema = new schema.Entity(
    'leg',
    {},
    {
      idAttribute: legIdAttribute,
      processStrategy: legProcessStrategy,
    }
  );
  const tripSchema = new schema.Entity(
    'trip',
    { fares: faresSchema, leg: [legSchema] },
    {
      idAttribute: tripIdAttribute,
      processStrategy: tripProcessStrategy,
    }
  );
  const requestSchema = new schema.Entity(
    'request',
    { trip: [tripSchema] },
    { idAttribute: (value, parent) => `${parent.date} ${parent.time}` }
  );
  const scheduleSchema = new schema.Entity(
    'schedule',
    { request: requestSchema },
    { idAttribute: (value) => `${value.date} ${value.time}` }
  );
  const responseSchema = new schema.Entity(
    'response',
    { schedule: scheduleSchema },
    { idAttribute: (value) => `${value.origin} ${value.destination}` }
  );

  const normalized = normalize(json.root, responseSchema);

  return normalized;
};
