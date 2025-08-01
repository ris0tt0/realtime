import React, { FC } from 'react';

export const RoutesAboutRoute: FC = () => {
  return (
    <div>
      <h2>🗺️ BART Routes</h2>
      <p>This page displays all available BART train routes, including:</p>
      <ul>
        <li>🚆 Route Name</li>
        <li>🎨 Line Color</li>
        <li>🛤️ Stations along the route</li>
        <li>📅 Service schedule (weekday/weekend)</li>
      </ul>
      <h3>✅ How to Use</h3>
      <ol>
        <li>Select a Route from the dropdown menu</li>
        <li>Click the "Select" button</li>
        <li>View detailed information about the route, including:</li>
        <ul>
          <li>Full list of stations (in travel order)</li>
          <li>Line color and direction</li>
          <li>Service availability</li>
        </ul>
      </ol>
    </div>
  );
};
