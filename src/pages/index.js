import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/5 border border-red-500 rounded h-full">
        <div className="space-y-2 text-xs flex flex-col">
          side panel
          <NavLink to="rtd">Real Times</NavLink>
          <NavLink to="tripplanner">Trip Planner</NavLink>
        </div>
      </div>
      <div className="h-full w-full border border-pink-700 rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
