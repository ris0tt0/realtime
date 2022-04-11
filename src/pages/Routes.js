import React from 'react';
import List from '../containers/routes/list';
import Results from '../containers/routes/result';

const Routes = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <List />
      <Results />
    </div>
  );
};

export default Routes;
