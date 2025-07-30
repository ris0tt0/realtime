# Project Title

Bay Area Rapid Transit stations, routes and real time estimates.

## Description

This application utilizes the BART api to gather information on real time train estimates, Route and station information. Please select an optoin in the menu. A working version is hosted here: [bart real time](http://jay-real-time.srv658343.hstgr.cloud/)

## Getting Started

### Dependencies

- modern yarn
- nodejs

### Installing

- [real time repository](https://github.com/ris0tt0/realtime)
- Please create a .env file and copy your own api key from [bart](https://www.bart.gov/schedules/developers/api)
- for vscode users, install this plugin by running this command:

```
yarn dlx @yarnpkg/sdks vscode
```

### Executing program

- To build for production:

```
yarn build:prod
```

- To build for development:

```
yarn build:dev
```

## Authors

Contributors names and contact info

Jonathan Gee
<j@jonathangee.com>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.

- [awesome-readme](https://github.com/matiassingers/awesome-readme)
- [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- [dbader](https://github.com/dbader/readme-template)
- [zenorocha](https://gist.github.com/zenorocha/4526327)
- [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)

This reactjs application utilizes the BART API to get Real Time Departures from a specific station. You may use also plan a trip between two stations.

I use redux to store the application data. reselect to create selectors for my application. I also normalize the API data with normalizr.

while installing:
yarn dlx @yarnpkg/sdks vscode

A working version is hosted [here](http://bart.jonathangee.com)
