import Logger from 'js-logger';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BartETD, BartStation, BartStationsETD } from '../db';
import { StationsParams } from '../routes';
import { useRTAppStore } from '../store/useRTAppStore';
import { useCommands } from './useCommands';

export type BartStationsETDFull = BartStationsETD & { station: BartStation };
export type BartETDFull = BartETD & { station: BartStation };

export const useRTEDetail = () => {
  const commands = useCommands();
  const stationsMap = useRTAppStore((state) => state.stationsMap);
  const [data, setData] = useState<BartStationsETDFull[] | null>(null);
  const { stationId } = useParams<StationsParams>();

  useEffect(() => {
    if (stationId) {
      commands.getStationEstimates(stationId).then((data) => {
        if (data.root.station) {
          const stations: BartStationsETDFull[] = data.root.station.map(
            (stn: BartStationsETD) => {
              const station = stationsMap[stn.abbr];
              const etd = stn.etd?.map((etd) => {
                const station: BartStation = stationsMap[etd.abbreviation];
                return {
                  ...etd,
                  station,
                };
              });
              return {
                ...stn,
                station,
                etd,
              };
            },
          );
          Logger.info('RTEDetail', stationId, data.root, stations);
          setData(stations);
        }
      });
    }
  }, [stationId]);

  return data ?? null;
};
