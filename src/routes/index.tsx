import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { About } from './about';
import { Root } from './root';
import { BartRoutes } from './routes';
import { RoutesAboutRoute } from './routes/about';
import { RouteDetail } from './routes/details';
import { RealTimeEstimates } from './rte';
import { RteAbout } from './rte/about';
import { RTEDetail } from './rte/details';
import { BartStations } from './station';
import { StationsAboutRoute } from './station/about';
import { StationDetail } from './station/details';

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
      { index: true, Component: About },
      { path: 'about', Component: About },
      {
        path: 'routes',
        Component: BartRoutes,
        children: [
          {
            index: true,
            Component: RoutesAboutRoute,
          },
          { path: ':routeNumber', Component: RouteDetail },
        ],
      },
      {
        path: 'stations',
        Component: BartStations,
        children: [
          {
            index: true,
            Component: StationsAboutRoute,
          },
          { path: ':stationId', Component: StationDetail },
        ],
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
