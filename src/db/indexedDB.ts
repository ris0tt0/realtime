import Logger from 'js-logger';
import {
  BartRoute,
  BartRouteDetail,
  BartStation,
  BartStationDetail,
  BartStationScheduleDetail,
  DB,
} from '.';

const DB_VERSION = 2;
const DB_NAME = 'rtbrt-db';
const STATIONS_STORE_NAME = 'stations';
const ROUTES_STORE_NAME = 'routes';
const STATION_DETAILS_STORE_NAME = 'stationDetails';
const STATION_SCHEDULE_STORE_NAME = 'stationSchedule';
const ROUTE_DETAILS_STORE_NAME = 'routeDetails';

export class IndexedDB implements DB {
  private db: IDBDatabase | null = null;
  init = () => {
    Logger.info('Initializing IndexedDB');

    const retVal = new Promise<null>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        // clear any data.
        if (db.objectStoreNames.contains(STATIONS_STORE_NAME)) {
          db.deleteObjectStore(STATIONS_STORE_NAME);
        }
        if (db.objectStoreNames.contains(ROUTES_STORE_NAME)) {
          db.deleteObjectStore(ROUTES_STORE_NAME);
        }
        if (db.objectStoreNames.contains(STATION_DETAILS_STORE_NAME)) {
          db.deleteObjectStore(STATION_DETAILS_STORE_NAME);
        }
        if (db.objectStoreNames.contains(ROUTE_DETAILS_STORE_NAME)) {
          db.deleteObjectStore(ROUTE_DETAILS_STORE_NAME);
        }
        if (db.objectStoreNames.contains(STATION_SCHEDULE_STORE_NAME)) {
          db.deleteObjectStore(STATION_SCHEDULE_STORE_NAME);
        }
        // add the store
        const stationsStore = db.createObjectStore(STATIONS_STORE_NAME, {
          keyPath: 'abbr',
          autoIncrement: false,
        });
        stationsStore.createIndex('name', 'name', { unique: true });

        const routesStore = db.createObjectStore(ROUTES_STORE_NAME, {
          keyPath: 'routeID',
          autoIncrement: false,
        });
        routesStore.createIndex('number', 'number', { unique: true });

        const stationDetailsStore = db.createObjectStore(
          STATION_DETAILS_STORE_NAME,
          {
            keyPath: 'abbr',
            autoIncrement: false,
          },
        );
        stationDetailsStore.createIndex('name', 'name', { unique: true });

        const stationScheduleStore = db.createObjectStore(
          STATION_SCHEDULE_STORE_NAME,
          {
            keyPath: 'id',
            autoIncrement: false,
          },
        );
        stationScheduleStore.createIndex('abbr', 'abbr', { unique: false });

        const routenDetailsStore = db.createObjectStore(
          ROUTE_DETAILS_STORE_NAME,
          {
            keyPath: 'abbr',
            autoIncrement: false,
          },
        );
        routenDetailsStore.createIndex('name', 'name', { unique: true });
        routenDetailsStore.createIndex('number', 'number', { unique: true });
        routenDetailsStore.createIndex('routeID', 'routeID', { unique: true });
      };
      request.onerror = (event) => {
        Logger.error("Why didn't you allow my web app to use IndexedDB?!");
        reject(event);
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve(null);
      };
    });

    return retVal;
  };
  getStationDetail(stationId: string): Promise<BartStationDetail | null> {
    const retVal = new Promise<BartStationDetail | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          STATION_DETAILS_STORE_NAME,
          'readonly',
        );
        if (transaction) {
          const store = transaction.objectStore(STATION_DETAILS_STORE_NAME);
          const request = store.get(stationId);
          request.onsuccess = () => {
            resolve(request.result ?? null);
          };
          request.onerror = (event) => {
            Logger.error('Error getting stations from IndexedDB', event);
            reject(event);
          };
          return;
        }
      }
    });

    return retVal;
  }
  getStationSchedule(
    stationId: string,
    day: string,
  ): Promise<BartStationScheduleDetail | null> {
    const retVal = new Promise<BartStationScheduleDetail | null>(
      (resolve, reject) => {
        const id = `${stationId}-${day}`;
        if (this.db) {
          const transaction = this.db.transaction(
            STATION_SCHEDULE_STORE_NAME,
            'readonly',
          );
          if (transaction) {
            const store = transaction.objectStore(STATION_SCHEDULE_STORE_NAME);
            const request = store.get(id);
            request.onsuccess = () => {
              resolve(request.result ?? null);
            };
            request.onerror = (event) => {
              Logger.error(
                'Error getting station schedule from IndexedDB',
                stationId,
                event,
              );
              reject(event);
            };
            return;
          }
        }
      },
    );

    return retVal;
  }

  getStations = () => {
    const retVal = new Promise<BartStation[] | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          STATIONS_STORE_NAME,
          'readonly',
        );
        if (transaction) {
          const store = transaction.objectStore(STATIONS_STORE_NAME);
          const request = store.getAll();
          request.onsuccess = () => {
            if (request.result.length > 0) {
              resolve(request.result);
            } else {
              resolve(null);
            }
          };
          request.onerror = (event) => {
            Logger.error('Error getting stations from IndexedDB', event);
            reject(event);
          };
          return;
        }
      }
      reject('database errors');
    });
    return retVal;
  };
  getRouteDetail(routeNumber: string): Promise<BartRouteDetail | null> {
    const retVal = new Promise<BartRouteDetail | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          ROUTE_DETAILS_STORE_NAME,
          'readonly',
        );
        if (transaction) {
          const store = transaction.objectStore(ROUTE_DETAILS_STORE_NAME);
          const index = store.index('number');
          const request = index.get(routeNumber);
          request.onsuccess = () => {
            resolve(request.result ?? null);
          };
          request.onerror = (event) => {
            Logger.error('Error getting stations from IndexedDB', event);
            reject(event);
          };
        } else {
          reject('transaction errors');
        }
      } else {
        reject('database errors');
      }
    });

    return retVal;
  }
  getRoutes = () => {
    const retVal = new Promise<BartRoute[] | null>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(ROUTES_STORE_NAME, 'readonly');
        if (transaction) {
          const store = transaction.objectStore(ROUTES_STORE_NAME);
          const request = store.getAll();
          request.onsuccess = () => {
            if (request.result.length > 0) {
              resolve(request.result);
            } else {
              resolve(null);
            }
          };
          request.onerror = (event) => {
            Logger.error('Error getting stations from IndexedDB', event);
            reject(event);
          };
          return;
        }
      }
      resolve(null);
    });
    return retVal;
  };

  setRouteDetail(route: BartRouteDetail): Promise<void> {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          ROUTE_DETAILS_STORE_NAME,
          'readwrite',
        );
        if (transaction) {
          const store = transaction.objectStore(ROUTE_DETAILS_STORE_NAME);
          const request = store.put(route);
          request.onsuccess = () => {
            resolve();
          };
          request.onerror = (event) => {
            reject(event);
          };
        }
      }
    });

    return retVal;
  }

  setStationDetail(station: BartStationDetail): Promise<void> {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          STATION_DETAILS_STORE_NAME,
          'readwrite',
        );
        if (transaction) {
          const store = transaction.objectStore(STATION_DETAILS_STORE_NAME);
          const request = store.put(station);
          request.onsuccess = () => {
            resolve();
          };
          request.onerror = (event) => {
            reject(event);
          };
        }
      }
    });

    return retVal;
  }

  setStationSchedule(schedule: BartStationScheduleDetail): Promise<void> {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          STATION_SCHEDULE_STORE_NAME,
          'readwrite',
        );
        if (transaction) {
          const store = transaction.objectStore(STATION_SCHEDULE_STORE_NAME);
          const request = store.put(schedule);
          request.onsuccess = () => {
            resolve();
          };
          request.onerror = (event) => {
            reject(event);
          };
        }
      }
    });

    return retVal;
  }

  setStations = (stations: BartStation[]) => {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(
          STATIONS_STORE_NAME,
          'readwrite',
        );
        if (transaction) {
          const store = transaction.objectStore(STATIONS_STORE_NAME);
          const stationRequests = stations.map((station) => {
            const retVal = new Promise<void>((resolve, reject) => {
              const request = store.put(station);
              request.onsuccess = () => {
                resolve();
              };
              request.onerror = (event) => {
                reject(event);
              };
            });
            return retVal;
          });

          Promise.all(stationRequests)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              Logger.error('Error setting stations in IndexedDB', error);
              reject(error);
            });
        } else {
          reject('transaction errors');
        }
      } else {
        reject('database errors');
      }
    });

    return retVal;
  };
  setRoutes = (routes: BartRoute[]) => {
    const retVal = new Promise<void>((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(ROUTES_STORE_NAME, 'readwrite');
        if (transaction) {
          const store = transaction.objectStore(ROUTES_STORE_NAME);
          const stationRequests = routes.map((route) => {
            const retVal = new Promise<void>((resolve, reject) => {
              const request = store.put(route);
              request.onsuccess = () => {
                resolve();
              };
              request.onerror = (event) => {
                reject(event);
              };
            });
            return retVal;
          });

          Promise.all(stationRequests)
            .then(() => {
              Logger.info('👍🏾db::setEiyrwa:allSuccess');
              resolve();
            })
            .catch((error) => {
              Logger.error('Error setting stations in IndexedDB', error);
              reject(error);
            });
        }
      }
    });

    return retVal;
  };
}
