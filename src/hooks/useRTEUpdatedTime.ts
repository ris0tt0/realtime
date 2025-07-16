import { useRTAppStore } from '../store/useRTAppStore';

export const useRTEUpdatedTime = () => {
  const rteUpdatedTimestamp = useRTAppStore(
    (state) => state.rteUpdatedTimestamp,
  );
  return rteUpdatedTimestamp;
};

export const useSetRTEUpdatedTime = () => {
  const setRteUpdatedTimestamp = useRTAppStore(
    (state) => state.setRteUpdatedTimestamp,
  );
  return setRteUpdatedTimestamp;
};
