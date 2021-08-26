import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getAppName } from '../selectors';

const Page = () => {
  const name = useSelector(getAppName);

  return (
    <div>
      <Typography variant="body1">{name}</Typography>
    </div>
  );
};

export default Page;
