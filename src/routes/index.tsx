import React, { FC } from 'react';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { Root } from './root';
import { About } from './about';
import { BartRoutes } from './routes';
import { RouteDetail } from './routes/details';
import { BartStations } from './station';
import { StationDetail } from './station/details';
import { RealTimeEstimates } from './rte';
import { RTEDetail } from './rte/detail';

export type StationsParams = {
  stationId: string;
};

export type RoutesParams = {
  routeNumber: string;
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { path: 'about', Component: About },
      {
        path: 'routes',
        Component: BartRoutes,
        children: [{ path: ':routeNumber', Component: RouteDetail }],
      },
      {
        path: 'stations',
        Component: BartStations,
        children: [{ path: ':stationId', Component: StationDetail }],
      },
      {
        path: 'rte',
        Component: RealTimeEstimates,
        children: [{ path: ':stationId', Component: RTEDetail }],
      },
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
