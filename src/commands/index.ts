import { BartRouteDetail, BartStationDetail } from '../db';
import { BartStationsETDFull } from '../hooks/useRealTimeEstimates';

export interface Commands {
  init(): Promise<boolean>;
  getStationDetails(stationId: string): Promise<BartStationDetail>;
  udpateStationRealTimeEstimates(
    stationId: string,
    platform?: number,
    direction?: string,
  ): Promise<BartStationsETDFull[] | null>;
  getRouteDetails(routeNumber: string): Promise<BartRouteDetail>;
}
