# BART Real-Time Tracker

A modern, fully **data-driven** React.js application that uses the **BART Legacy API** to display real-time Bay Area Rapid Transit information — including live departure times, route information, and station details.

🔗 **Live Demo**: [BART](https://realtime.jrgee.com)

## Overview

This app is designed for BART commuters and transit enthusiasts who want fast, reliable, and clean access to system data from any device. It leverages modern front-end tools to present legacy transit data in a real-time, user-friendly experience.

The project is bundled with **Webpack 5** and uses **Webpack Module Federation** to expose key components for use in other applications. This enables true micro-frontend architecture and remote composition.

---

## Features

- **Real-Time Departures** — View upcoming train departures from any station
- **Station Info** — Explore BART stations, including location, lines served, and ETD data
- **Route Info** — Visualize all BART lines with stop lists and route details
- **Offline Support** — IndexedDB-based caching of data for faster reloads
- **Modular Architecture** — Clean, scalable React app structure
- **Module Federation** — Exposes BART components for remote consumption

---

## Tech Stack

- **React.js** — Functional components & hooks
- **Webpack 5** — Custom build setup for full control
- **Webpack Module Federation** — Exposes components across app boundaries
- **Axios** — HTTP client for API communication
- **Zustand** — Lightweight state management for route/station/ETD state
- **IndexedDB** — Long-term browser storage for offline support
- **BART Legacy API** — Official public API providing all transit data
- **Material UI** — UI styling
- **Yarn 3+ (Modern)** — Zero-install package management with PnP

---

## Pages

### `/about`

General overview of the application, features, and tech.

### `/routes`

- Select a BART route from a dropdown
- View details such as line color, direction, and all stops

### `/stations`

- Select a station from a dropdown
- See location, basic info, and associated routes

### `/departures`

- Select a station and view **real-time train departure estimates**
- Info includes destination, platform, wait time, train length, and more

---

## Running the App

```bash
# Install dependencies (Yarn PnP)
yarn

# Enable VSCode support for Yarn PnP
yarn dlx @yarnpkg/sdks vscode

# Start local dev server
yarn start
```

---

## Build

```bash
# Build for development
yarn build:dev

# Build for production
yarn build:prod
```

## Feedback & Contributions

Feel free to fork, open issues, or submit PRs.
This project is open to ideas and collaboration.

## License

MIT License
You are free to use, modify, and distribute this code with attribution.
