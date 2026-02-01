import axios, { AxiosInstance } from 'axios';
import { RealTimeApi } from '.';

const api_key = process.env.BART_API_KEY;

const config = {
  baseURL: 'https://api.bart.gov/api',
  params: { key: api_key, json: 'y' },
};
export class RealTimeApiImpl implements RealTimeApi {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create(config);
  }
  init() {
    const retVal = Promise.resolve(true);
    return retVal;
  }

  getRoutes = async () => {
    const request = await this.axios.get(`/route.aspx`, {
      params: { cmd: 'routes' },
    });
    return request.data;
  };
  getRouteDetail = async (routeNumber: string) => {
    const request = await this.axios.get(`/route.aspx`, {
      params: { cmd: 'routeinfo', route: routeNumber },
    });
    return request.data;
  };
  getStations = async () => {
    const request = await this.axios.get(`/stn.aspx`, {
      params: { cmd: 'stns' },
    });
    return request.data;
  };
  getStationDetail = async (stationId: string) => {
    const request = await this.axios.get(`/stn.aspx`, {
      params: { cmd: 'stninfo', orig: stationId },
    });
    return request.data;
  };

  getElevatorStatus = async () => {
    const request = await this.axios.get(`/bsa.aspx`, {
      params: { cmd: 'elev' },
    });
    return request.data;
  };

  getStationSchedule = async (stationId: string, date: string = 'today') => {
    const request = await this.axios.get(`/sched.aspx`, {
      params: { cmd: 'stnsched', orig: stationId, date },
    });
    return request.data;
  };

  getTrainCount = async () => {
    const request = await this.axios.get(`/bsa.aspx`, {
      params: { cmd: 'count' },
    });
    return request.data?.root?.traincount ?? 0;
  };

  getAdvisories = async () => {
    const request = await this.axios.get(`/bsa.aspx`, {
      params: { cmd: 'bsa' },
    });
    return request.data;
  };

  getRealTimeEstimates = async (
    station: string,
    platform?: number,
    direction?: string,
  ) => {
    const request = await this.axios.get(`/etd.aspx`, {
      params: { cmd: 'etd', orig: station, plat: platform, dir: direction },
    });
    return request.data;
  };

  getTripPlanning = async (
    originStation: string,
    destinationStation: string,
  ) => {
    const request = await this.axios.get(`/sched.aspx`, {
      params: { cmd: 'depart', orig: originStation, dest: destinationStation },
    });
    return request.data;
  };
}
