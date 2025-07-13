import React, { FC } from 'react';

export const RteAbout: FC = () => {
  return (
    <div>
      <h1>About Real Time Estimates</h1>
      <p>
        This section provides real-time estimates for BART trains, allowing
        users to check the status and expected arrival times at various
        stations.
      </p>
      <p>
        Please select a station and click "Select" to view the real-time
        estimates for that station.
      </p>
    </div>
  );
};
