import React, { FC } from 'react';

export const RoutesAboutRoute: FC = () => {
  return (
    <main>
      <h2>Bay Area Rapid Transit Routes</h2>
      <p>This page displays all available BART train routes, including:</p>
      <ul>
        <li>Route Name</li>
        <li>Line Color</li>
        <li>Stations along the route</li>
      </ul>
      <h3>How to Use</h3>
      <ol>
        <li>Select a Route from the dropdown menu</li>
        <li>Click the "Select" button</li>
        <li>View detailed information about the route, including:</li>
        <ul>
          <li>Full list of stations (in travel order)</li>
          <li>Line color and direction</li>
        </ul>
      </ol>
    </main>
  );
};
