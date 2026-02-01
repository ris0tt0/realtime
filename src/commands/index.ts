import {
  BartRouteDetail,
  BartStationDetail,
  BartStationScheduleDetail,
  BartStationsETDFull,
} from '../db';

export interface Commands {
  init(): Promise<boolean>;
  getStationDetails(stationId: string): Promise<BartStationDetail>;
  getStationSchedule(
    stationId: string,
    date: string,
  ): Promise<BartStationScheduleDetail>;
  updateElevatorStatus(): Promise<string[]>;
  updateStationRealTimeEstimates(
    stationId: string,
    platform?: number,
    direction?: string,
  ): Promise<BartStationsETDFull[] | null>;
  getRouteDetails(routeNumber: string): Promise<BartRouteDetail>;
  updateAdvisories(): Promise<string[]>;
}
