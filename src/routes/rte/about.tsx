import React, { FC } from 'react';

export const RteAbout: FC = () => {
  return (
    <div>
      <h2>⏱️ About Real-Time Departures</h2>
      <p>
        The Real-Time Departures feature provides up-to-the-minute train
        departure estimates from any BART station using live data from the BART
        Legacy API.
      </p>
      <p>
        Whether you’re rushing to make a train or just checking when the next
        one is due, this tool gives you fast, reliable information right from
        the source.
      </p>
      <h3>🧠 How It Works</h3>
      <p>
        When you select a station, the app uses the etd endpoint from the BART
        Legacy API to fetch:
      </p>
      <ul>
        <li>🚆 Destination of each upcoming train</li>
        <li>⏳ Minutes until departure</li>
        <li>🛤️ Platform number</li>
        <li>📏 Train length (in number of cars)</li>
        <li>🎨 Line color (e.g., Blue, Yellow)</li>
        <li>📊 Load level (when available)</li>
      </ul>
      <p>
        The data is refreshed live — optionally on a timer — to give you the
        most accurate departure info.
      </p>
    </div>
  );
};
