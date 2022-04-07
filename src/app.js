import Logger from 'js-logger';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useCommands } from './hooks/useCommands';
import Layout from './pages/Layout';
import RealTimeDepartures from './pages/RealTimeDepartures';
import RouteInfo from './pages/RouteInfo';
import TripPlanner from './pages/TripPlanner';

const App = () => {
  const commands = useCommands();
  Logger.info('App::commands', commands);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-700 text-slate-200">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="rtd" element={<RealTimeDepartures />} />
          <Route path="tripplanner" element={<TripPlanner />} />
          <Route path="routeinfo" element={<RouteInfo />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export { App };
