import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import BSAResults from '../containers/bsa/results';

const Layout = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/5 h-full bg-background-secondary">
        <div className="flex flex-col p-3 space-y-2 text-xs">
          <NavLink to="rtd">Real Time Departures</NavLink>
          <NavLink to="tripplanner">Trip Planner</NavLink>
          <NavLink to="routeinfo">Route Information</NavLink>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full">
          <BSAResults />
        </div>
        <div className="flex w-full h-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
