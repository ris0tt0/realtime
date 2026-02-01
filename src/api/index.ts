export interface RealTimeApi {
  init(): Promise<boolean>;
  getRoutes(): Promise<any>;
  getRouteDetail(routeNumber: string): Promise<any>;
  getStations(): Promise<any>;
  getStationDetail(stationId: string): Promise<any>;
  getStationSchedule(stationId: string, date: string): Promise<any>;
  getTrainCount(): Promise<number>;
  getElevatorStatus(): Promise<any>;
  getAdvisories(): Promise<any>;
  getRealTimeEstimates(
    station: string,
    platform?: number,
    direction?: string,
  ): Promise<any>;
  getTripPlanning(
    originStation: string,
    destinationStation: string,
  ): Promise<any>;
}
