export type SortStationsBy = 'name' | 'platform';
export type LinePlatforms = 'PL 1' | 'PL 2' | 'PL 3' | 'PL 4';

export type BartStation = {
  abbr: string;
  address: string;
  city: string;
  country: string;
  gtfs_longitude: string;
  gtfs_latitude: string;
  name: string;
  state: string;
  zipcode: string;
};

export type BartStationSchedule = {
  routeID: string;
  north: Record<string, BartStationScheduleItem>;
  south: Record<string, BartStationScheduleItem>;
};

export type BartStationScheduleItem = {
  bikeflag: string;
  line: string;
  load: string;
  origTime: string;
  platform: string;
  trainHeadStation: string;
};

export type BartStationScheduleDetail = {
  id: string;
  abbr: string;
  date: string;
  name: string;
  items: BartStationScheduleItem[];
  platforms: Record<LinePlatforms, BartStationScheduleItem[]>;
};

export type BartStationDetail = {
  abbr: string;
  address: string;
  attraction: string;
  city: string;
  county: string;
  cross_street: string;
  food: string;
  gtfs_latitude: string;
  gtfs_longitude: string;
  intro: string;
  link: string;
  name: string;
  north_platform: { platform: string[] };
  north_routes: { route: string[] };
  shopping: string;
  south_platform: { platform: string[] };
  south_routes: { route: string[] };
  state: string;
  zipcode: string;
};

export type BartRoute = {
  abbr: string;
  originStation: string;
  destinationStation: string;
  color: string;
  direction: string;
  hexcolor: string;
  name: string;
  number: string;
  routeID: string;
};

export type BartRouteDetail = {
  abbr: string;
  color: string;
  config: { station: string[] };
  direction: string;
  hexcolor: string;
  name: string;
  num_stns: string;
  number: string;
  origin: string;
  routeId: string;
};

export type BartStationsETD = {
  abbr: string;
  etd?: BartETD[];
  name: string;
};

export type BartETD = {
  abbreviation: string;
  destination: string;
  estimate: BartStationEstimate[];
  limited: string;
};

export type BartStationEstimate = {
  bikeflag: string;
  cancelflag: string;
  color: string;
  delay: string;
  direction: string;
  dynamicflag: string;
  hexcolor: string;
  length: string;
  minutes: string;
  platform: string;
};

export type RealTimeEstimates = {
  id: string;
  update: string;
  sort: SortStationsBy;
  data: BartStationsETDFull;
};

export interface DB {
  init(): Promise<null>;

  getStationDetail(stationId: string): Promise<BartStationDetail | null>;
  setStationDetail(station: BartStationDetail): Promise<void>;

  getStationSchedule(
    stationId: string,
    day: string,
  ): Promise<BartStationScheduleDetail | null>;
  setStationSchedule(station: BartStationScheduleDetail): Promise<void>;

  getStations(): Promise<BartStation[] | null>;
  setStations(stations: BartStation[]): Promise<void>;

  getRouteDetail(routeNumber: string): Promise<BartRouteDetail | null>;
  setRouteDetail(route: BartRouteDetail): Promise<void>;

  getRoutes(): Promise<BartRoute[] | null>;
  setRoutes(routes: BartRoute[]): Promise<void>;
}

export type BartStationsETDFull = BartStationsETD & { station: BartStation };
