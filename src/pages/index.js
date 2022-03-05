import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/5 h-full border border-red-500 rounded">
        <div className="flex flex-col space-y-2 text-xs">
          <NavLink to="rtd">Real Times</NavLink>
          <NavLink to="tripplanner">Trip Planner</NavLink>
        </div>
      </div>
      <div className="w-full h-full border border-pink-700 rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
