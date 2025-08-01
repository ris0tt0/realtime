import React, { FC } from 'react';

export const StationsAboutRoute: FC = () => {
  return (
    <div>
      <h2>📍 BART Stations</h2>
      <p>This page displays all active BART stations, along with:</p>
      <ul>
        <li>🏷️ Station Name & Abbreviation</li>
        <li>📌 Location (City)</li>
        <li>🕓 Real-time arrival info (if supported)</li>
        <li>📫 Address / Latitude & Longitude</li>
      </ul>
      <h3>✅ How to Use</h3>
      <ol>
        <li>Select a station from the dropdown menu</li>
        <li>Click the "Select" button</li>
        <li>View detailed information about the station, including:</li>
        <ul>
          <li>Real-time departures</li>
          <li>Station name, address, and location</li>
          <li>Routes that pass through the station</li>
        </ul>
      </ol>
    </div>
  );
};
