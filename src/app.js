import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages';
import RealTimeDepartures from './pages/RealTimeDepartures';
import TripPlanner from './pages/TripPlanner';

const App = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-700 text-slate-200">
      <Routes>
        <Route path="bart" element={<Layout />}>
          <Route path="rtd" element={<RealTimeDepartures />} />
          <Route path="tripplanner" element={<TripPlanner />} />
        </Route>
        <Route path="*" element={<Navigate to="bart" />} />
      </Routes>
    </div>
  );
};

export { App };
