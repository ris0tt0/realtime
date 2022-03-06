import React from 'react';
import List from '../containers/routeInfo/list';
import Results from '../containers/routeInfo/result';

const RouteInfo = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <List />
      <Results />
    </div>
  );
};

export default RouteInfo;
