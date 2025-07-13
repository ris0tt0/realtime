import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from './about';
import { Root } from './root';
import { BartRoutes } from './routes';
import { RouteDetail } from './routes/details';
import { RealTimeEstimates } from './rte';
import { RTEDetail } from './rte/details';
import { BartStations } from './station';
import { StationDetail } from './station/details';
import { RteAbout } from './rte/about';
import { Landing } from './landing';

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
      { index: true, Component: Landing },
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
        children: [
          {
            index: true,
            Component: RteAbout,
          },
          { path: ':stationId', Component: RTEDetail },
        ],
      },
    ],
  },
]);

export const Routes: FC = () => {
  return <RouterProvider router={router} />;
};
