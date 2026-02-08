import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  routesListSelector,
  routesNumberSelector,
  routesSelector,
} from '../selectors';

export const useRouteLines = (id?: string[]) => {
  const map = useSelector(routesNumberSelector);

  const routes = useMemo(() => {
    return (
      id?.map((id) => {
        return map[id];
      }) ?? null
    );
  }, [id, map]);

  return routes;
};

export const useRoutes = () => {
  const routes = useSelector(routesListSelector);

  return routes;
};

export const useRoutesNumberMap = () => {
  const routes = useSelector(routesNumberSelector);

  return routes;
};

export const useRoutesMap = () => {
  const map = useSelector(routesSelector);
  return map;
};
