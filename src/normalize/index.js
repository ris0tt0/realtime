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
