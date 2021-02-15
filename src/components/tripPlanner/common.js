import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Logger from 'js-logger';
import { getFormattedTimeDifference } from '../../utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: '200px',
    flex: 1,
  },
}));

const ItineraryBar = ({ leg }) => {
  const classes = useStyles();

  const data = useMemo(() => {
    const minutes = leg.map((item) =>
      getFormattedTimeDifference(item.origDate, item.destDate)
    );

    const total = minutes.reduce((total, min) => (total += min), 0);

    return leg.map((item, index) => ({
      hexcolor: item.line.hexcolor,
      flexNum: minutes[index] / total,
    }));
  }, [leg]);

  return (
    <div className={classes.root}>
      {data.map(({ flexNum, hexcolor }, index) => {
        return (
          <div
            key={`trip-${index}`}
            style={{
              backgroundColor: hexcolor,
              height: '10px',
              display: 'flex',
              flex: flexNum,
            }}
          />
        );
      })}
    </div>
  );
};

ItineraryBar.propTypes = {};

export { ItineraryBar };
