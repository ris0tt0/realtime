import Logger from 'js-logger';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRTDDateSelector } from '../../selectors/RealTimeDepartures';

const Information = () => {
  const date = useSelector(getRTDDateSelector);
  Logger.info(date);
  return (
    <div className="flex justify-end px-2 mx-2 text-xs">
      {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
    </div>
  );
};

export default Information;
