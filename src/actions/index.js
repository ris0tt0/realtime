import { normalize, schema } from 'normalizr';

export const GET_ETA = 'get eta';
export const GET_STATIONS = 'get stations';
export const RECIEVE_STATIONS = 'receive stations';
export const RECIEVE_TRAIN_COUNT = 'recieve train count';
export const RECIEVE_RTE = 'receieve real time estimate';
export const RECIEVE_TRIP_PLANNING = 'receieve trip planning';
export const RECIEVE_ROUTES = 'recieve routes';
export const SET_STARTING_ABBR = 'set starting abbr';
export const SET_DESTINATION_ABBR = 'set destination abbr';
export const SET_TRIP_PLANNER_DETAILS = 'set trip planner details';
export const SET_TRIP_PLANNER_LEG_IDS = 'set trip planner leg ids;';

export const SHOW_SORT_SELECTION = 'show sort selection';

export function getETA(station) {
  return { type: GET_ETA, station };
}
export function getStations() {
  return { type: GET_STATIONS };
}
export function recieveRoutes(routes) {
  return { type: RECIEVE_ROUTES, routes };
}
export function recieveStations(stations) {
  return { type: RECIEVE_STATIONS, stations };
}
export function recieveTrainCount(data) {
  return { type: RECIEVE_TRAIN_COUNT, data };
}
export function recieveRTE(data) {
  return { type: RECIEVE_RTE, data };
}
export function recieveTripPlanning(data) {
  return { type: RECIEVE_TRIP_PLANNING, data };
}
export function showSortSelection(selection) {
  return { type: SHOW_SORT_SELECTION, selection };
}
export function setStartingAbbr(abbr) {
  return { type: SET_STARTING_ABBR, abbr };
}
export function setDestinationAbbr(abbr) {
  return { type: SET_DESTINATION_ABBR, abbr };
}
export function setTripPlannerDetails(tripId) {
  return { type: SET_TRIP_PLANNER_DETAILS, tripId };
}
export function setTripPlannerLegIds(legIds) {
  return { type: SET_TRIP_PLANNER_LEG_IDS, legIds };
}

const DEV_KEY = 'MW9S-E7SL-26DU-VV8V';

export function fetchRoutes() {
  return (dispatch) => {
    return fetch(
      `http://api.bart.gov/api/route.aspx?cmd=routes&key=${DEV_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => {
        const routeSchema = new schema.Entity('route', undefined, {
          idAttribute: (item) => item.routeID,
        });
        const routesSchema = new schema.Entity(
          'routes',
          { route: [routeSchema] },
          { idAttribute: (item) => 'id' }
        );
        const normalized = normalize(json.root.routes, routesSchema);

        dispatch(recieveRoutes(normalized));
      });
  };
}

export function fetchStations() {
  return (dispatch) => {
    return fetch(
      `http://api.bart.gov/api/stn.aspx?cmd=stns&key=${DEV_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => {
        const stationSchema = new schema.Entity('stations');
        // add id.
        const idAdded = json.root.stations.station.map((item) => {
          return { ...item, id: item.abbr };
        });
        // normalize the station data.
        const normalized = normalize(idAdded, [stationSchema]);

        dispatch(recieveStations(normalized));
      });
  };
}

export function fetchTrainCount() {
  return (dispatch) => {
    return fetch(
      `http://api.bart.gov/api/bsa.aspx?cmd=count&key=${DEV_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => {
        const uriSchema = new schema.Entity('uri', undefined, {
          idAttribute: (uri) => 'uriId',
        });
        const trainCountSchema = new schema.Entity(
          'traincount',
          { uri: uriSchema },
          { idAttribute: (train) => train.time }
        );
        const data = normalize(json.root, trainCountSchema);

        dispatch(recieveTrainCount(data));
      });
  };
}

export function fetchRealTimeEstimates(station) {
  return (dispatch) => {
    return fetch(
      `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=${DEV_KEY}&json=y`
    )
      .then((response) => response.json())
      .then((json) => {
        const estimateSchema = new schema.Entity('estimate', undefined, {
          idAttribute: (estimate) => {
            const {
              color,
              bikeflag,
              delay,
              direction,
              hexcolor,
              length,
              minutes,
              platform,
            } = estimate;

            return `${color}-${bikeflag}-${delay}-${direction}-${hexcolor}-${length}-${minutes}-${platform}`;
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

        dispatch(recieveRTE(normalized));
      });
  };
}

export function fetchTripPlanning() {
  return (dispatch, getState) => {
    const { startingAbbr, destinationAbbr } = getState();

    if (
      startingAbbr &&
      startingAbbr.length > 0 &&
      destinationAbbr &&
      destinationAbbr.length > 0
    ) {
      return fetch(
        `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${startingAbbr}&dest=${destinationAbbr}&date=today&time=now&key=${DEV_KEY}&b=1&a=4&json=y`
      )
        .then((response) => response.json())
        .then((json) => {
          // start to normalize the json response.
          const fareSchema = new schema.Entity('fare', undefined, {
            idAttribute: (value) => value['@name'],
          });
          const faresSchema = new schema.Entity(
            'fares',
            { fare: [fareSchema] },
            {
              idAttribute: (value) => `${value['@level']}-${value.fare.length}`,
            }
          );
          const legSchema = new schema.Entity('leg', undefined, {
            idAttribute: (value) =>
              value['@origTimeMin'] + value['@destTimeMin'],
          });
          const tripSchema = new schema.Entity(
            'trip',
            { fares: faresSchema, leg: [legSchema] },
            {
              idAttribute: (value) =>
                `${value['@origTimeMin']}-${value['@destTimeMin']}`,
            }
          );
          const requestSchema = new schema.Entity(
            'request',
            { trip: [tripSchema] },
            { idAttribute: (value) => 'requestId' }
          );
          const scheduleSchema = new schema.Entity(
            'schedule',
            { request: requestSchema },
            { idAttribute: (value) => `${value.time}-${value.date}` }
          );
          const responseSchema = new schema.Entity(
            'response',
            { schedule: scheduleSchema },
            { idAttribute: (value) => `${value.origin}-${value.destination}` }
          );

          const normalized = normalize(json.root, responseSchema);

          dispatch(recieveTripPlanning(normalized));
        });
    }
  };
}
