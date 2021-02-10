import React from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  platform: {
    margin: '10px 0',
  },
  destinations: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  destination: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    display: 'flex',
    padding: '0 10px',
  },
  estimates: {
    display: 'flex',
  },
  minutes: {
    padding: '0 5px',
  },
});

const Platforms = ({ platformMap }) => {
  const classes = useStyles();

  return Array.from(platformMap).map(
    ([platformName, destinationMap], index) => (
      <Paper key={`-p${index}`} className={classes.platform}>
        <Typography variant="h6">Platform {platformName}</Typography>
        <div className={classes.destinations}>
          {Array.from(destinationMap).map(
            ([_, { destination, estimate }], index) => {
              return (
                <div key={`-${index}`} className={classes.destination}>
                  <div>
                    <Typography variant="h5">{destination.name}</Typography>
                  </div>
                  <div className={classes.estimates}>
                    {estimate.map((item) => (
                      <Typography className={classes.minutes} variant="h4">
                        {item.minutes}
                      </Typography>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Paper>
    )
  );
};

Platforms.propTypes = {
  platformMap: PropTypes.object.isRequired,
};

export { Platforms };
