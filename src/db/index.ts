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
  color: string;
  direction: string;
  hexcolor: string;
  name: string;
  number: string;
  routeId: string;
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
  estimate: BartStaionEstimate[];
  limited: string;
};

export type BartStaionEstimate = {
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

export interface DB {
  init(): Promise<null>;
  getStationDetail(stationId: string): Promise<BartStationDetail | null>;
  setStationDetail(station: BartStationDetail): Promise<void>;
  getStations(): Promise<BartStation[] | null>;
  setStations(stations: BartStation[]): Promise<void>;
  getRouteDetail(routeNumber: string): Promise<BartRouteDetail | null>;
  setRouteDetail(route: BartRouteDetail): Promise<void>;
  getRoutes(): Promise<BartRoute[] | null>;
  setRoutes(routes: BartRoute[]): Promise<void>;
}
