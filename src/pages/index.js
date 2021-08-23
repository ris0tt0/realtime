import React from 'react';
import { useSelector } from 'react-redux';
import { getAppName } from '../selectors';

const Page = () => {
  const name = useSelector(getAppName);

  return <div>{name}</div>;
};

export default Page;
