import { BartRouteDetail, BartStationDetail } from '../db';

export interface Commands {
  init(): Promise<boolean>;
  getStationDetails(stationId: string): Promise<BartStationDetail>;
  getStationEstimates(
    stationId: string,
    platform?: number,
    direction?: string,
  ): Promise<any>;
  getStationEstimatesRefresh(): Promise<any>;
  getRouteDetails(routeNumber: string): Promise<BartRouteDetail>;
}
