import { useRTAppStore } from '../store/useRTAppStore';

export const useRoutes = () => {
  const routes = useRTAppStore((state) => state.routes);
  return routes;
};

export const useRoutesMap = () => {
  const routesMap = useRTAppStore((state) => state.routesMap);
  return routesMap;
};

export const useSetRoutes = () => {
  const setRoutes = useRTAppStore((state) => state.setRoutes);
  return setRoutes;
};
