import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import RealTimeDepartures from './pages/RealTimeDepartures';
import RouteInfo from './pages/Routes';
import TripPlanner from './pages/TripPlanner';

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen text-text-primary bg-background-primary">
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

export default App;
