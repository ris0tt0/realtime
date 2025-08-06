import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const About: FC = () => {
  return (
    <div>
      <h2>About This Application</h2>
      <p>
        Welcome to the BART Real-Time Tracker — a React.js application built
        using the BART Legacy API to provide real-time transit information for
        Bay Area Rapid Transit riders.
      </p>
      <h3>🛠 Features</h3>
      <ul>
        <li>🚉 View live departures for any BART station</li>
        <li>Select a station to get detailed arrival and route information</li>
        <li>Refresh data in real-time using BART’s public legacy API</li>
        <li>Offline support with long-term data caching</li>
        <li>Built for performance with modern React best practices</li>
      </ul>
      <h3>Why This App?</h3>
      <p>
        BART’s legacy API still delivers reliable real-time transit data. This
        app showcases how legacy APIs can be integrated into a performant and
        user-friendly modern web experience. Whether you're commuting or just
        exploring the Bay Area, this app gives you fast access to up-to-date
        train times.
      </p>
      <h3>Tech Stack</h3>
      <ul>
        <li>React.js (Functional Components + Hooks)</li>
        <li>Axios for handling API requests</li>
        <li>
          Zustand for lightweight and scalable application state management
        </li>
        <li>IndexedDB for long-term local storage and offline support</li>
        <li>Material UI</li>
        <li>BART Legacy API</li>
        <li>Deployed via dokku</li>
      </ul>
      <h3>Feedback</h3>
      <p>
        This project is open source and always improving. If you have ideas or
        run into bugs, feel free to submit feedback or contribute on GitHub
        <Link to="https://github.com/ris0tt0/realtime">repo</Link>
      </p>
    </div>
  );
};
