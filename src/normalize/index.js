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
  const uriSchema = new schema.Entity('uri', undefined, {
    idAttribute: (uri) => 'uriId',
  });
  const trainCountSchema = new schema.Entity(
    'traincount',
    { uri: uriSchema },
    { idAttribute: (train) => train.time }
  );
  const normalized = normalize(json.root, trainCountSchema);
  return normalized;
};

export const normalizeElevators = (json) => {
  const uriSchema = new schema.Entity('uri', undefined, {
    idAttribute: (uri) => 'uriId',
  });
  const trainCountSchema = new schema.Entity(
    'elevators',
    { uri: uriSchema },
    { idAttribute: (train) => train.time }
  );
  const normalized = normalize(json.root, trainCountSchema);
  return normalized;
};
