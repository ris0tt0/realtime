import React from 'react';
import Information from '../containers/rtd/information';
import RealTimeDeparturesList from '../containers/rtd/list';
import RealTimeDeparturesResult from '../containers/rtd/result';

const RealTimeDeparturesPage = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex p-2 m-2">
        <RealTimeDeparturesList />
      </div>
      <div>
        <Information />
      </div>
      <div className="flex p-2 m-2">
        <RealTimeDeparturesResult />
      </div>
    </div>
  );
};

export default RealTimeDeparturesPage;
