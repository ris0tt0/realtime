import { BartETD, BartStation, BartStationsETD } from '../db';
import { useRTAppStore } from '../store/useRTAppStore';

// TODO move in apropriate place
export type BartStationsETDFull = BartStationsETD & { station: BartStation };
export type BartETDFull = BartETD & { station: BartStation };

export const useRTE = () => {
  const rte = useRTAppStore((state) => state.realTimeEstimates);
  return rte;
};

export const useSetRTE = () => {
  const setRte = useRTAppStore((state) => state.setRealTimeEstimates);
  return setRte;
};
