import { useSelector } from 'react-redux';
import {
  routesListSelector,
  routesNumberSelector,
  routesSelector,
} from '../selectors';

export const useRouteLines = (id?: string[]) => {
  const map = useSelector(routesNumberSelector);

  if (!id) return null;

  const routes = id.map((id) => {
    return map[id];
  });

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
