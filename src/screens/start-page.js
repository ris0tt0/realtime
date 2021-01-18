import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Start = ({ onStart }) => (
  <div>
    <Button variant="contained" size="small" onClick={onStart}>
      start application
    </Button>
  </div>
);

Start.propTypes = {
  onStart: PropTypes.func,
};

export { Start };
