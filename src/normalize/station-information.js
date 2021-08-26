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

export const normalizeStationInfo = (json) => json;

export const normalizeStationAccess = (json) => json;
