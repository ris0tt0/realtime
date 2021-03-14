import { makeStyles, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React from 'react';

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
    display: 'flex',
    padding: '0 10px',
  },
  estimates: {
    display: 'flex',
  },
  estimate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  minutes: {
    padding: '0 5px',
  },
});

const Platforms = ({ platformMap }) => {
  const classes = useStyles();

  return Array.from(platformMap).map(
    ([platformName, destinationMap], index) => (
      <div key={`-p${index}`} className={classes.platform}>
        <Typography variant="h6">Platform {platformName}</Typography>
        <div className={classes.destinations}>
          {Array.from(destinationMap).map(
            ([_, { destination, estimate }], index) => {
              return (
                <div key={`-${index}`} className={classes.destination}>
                  <div>
                    <Typography variant="h6">{destination.name}</Typography>
                  </div>
                  <div className={classes.estimates}>
                    {estimate.map((item) => (
                      <div className={classes.estimate}>
                        <Typography className={classes.minutes} variant="h6">
                          {isNaN(parseInt(item.minutes, 10))
                            ? item.minutes
                            : `${item.minutes} min`}
                        </Typography>
                        <Typography variant="caption">
                          {item.length} car
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  );
};

Platforms.propTypes = {
  platformMap: PropTypes.object.isRequired,
};

export { Platforms };
