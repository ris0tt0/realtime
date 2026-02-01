import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  BartRoute,
  BartStation,
  BartStationSchedule,
  RealTimeEstimates,
} from '../db';

export type RteState = {
  // load the total number of trains in service
  totalTrainsInService: number;
  // any bart issues
  advisories: string[];
  // elevator status
  elevatorStatus: string[];
  //routes by route abbr
  routes: Record<string, BartRoute>;
  //routes by route number
  routeNumbers: Record<string, BartRoute>;
  //stations by station id
  stations: Record<string, BartStation>;
  //real time estimates
  rte: Record<string, RealTimeEstimates>;
  stationSchedule: Record<string, BartStationSchedule>;
};

const initialState: RteState = {
  // load the total number of trains in service
  totalTrainsInService: 0,
  // any bart issues
  advisories: [],
  //
  elevatorStatus: [],
  //routes by route id
  routes: {},
  //routes by route number
  routeNumbers: {},
  //stations by station id
  stations: {},
  //real time estimates
  rte: {},
  stationSchedule: {},
};

const rteSlice = createSlice({
  name: 'rte',
  initialState,
  reducers: {
    setTotalTrainsInService(state, action: PayloadAction<number>) {
      state.totalTrainsInService = action.payload;
    },
    setAdvisories(state, action: PayloadAction<string[]>) {
      state.advisories = action.payload;
    },
    setElevatorStatus(state, action: PayloadAction<string[]>) {
      state.elevatorStatus = action.payload;
    },
    setStations(state, action: PayloadAction<Record<string, BartStation>>) {
      state.stations = action.payload;
    },
    setRoutes(state, action: PayloadAction<Record<string, BartRoute>>) {
      state.routes = action.payload;
    },
    setRoutesByNumber(state, action: PayloadAction<Record<string, BartRoute>>) {
      state.routeNumbers = action.payload;
    },
    setRte(state, action: PayloadAction<RealTimeEstimates>) {
      const id = action.payload.id;
      const current = state.rte[id] ?? {};

      state.rte[id] = { ...current, ...action.payload };
    },
    setStationSchedule(state, action: PayloadAction<BartStationSchedule>) {
      const id = action.payload.routeID;
      const current = state.stationSchedule[id] ?? {};

      state.stationSchedule[id] = { ...current, ...action.payload };
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = rteSlice;
// Extract and export each action creator by name
export const {
  setTotalTrainsInService,
  setAdvisories,
  setElevatorStatus,
  setStations,
  setRoutes,
  setRoutesByNumber,
  setRte,
  setStationSchedule,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
