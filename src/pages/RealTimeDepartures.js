import React from 'react';
import RealTimeDeparturesList from '../containers/realTimeDepartures/list';
import RealTimeDeparturesResult from '../containers/realTimeDepartures/result';

const RealTimeDeparturesPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex border border-pink-400 rounded">
        <RealTimeDeparturesList />
      </div>
      <div className="flex w-full h-full border border-green-400 rounded">
        <RealTimeDeparturesResult />
      </div>
    </div>
  );
};

export default RealTimeDeparturesPage;
