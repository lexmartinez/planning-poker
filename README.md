# planning-poker

[![Build Status](https://img.shields.io/travis/lexmartinez/planning-poker/master.svg?style=for-the-badge)](https://travis-ci.org/lexmartinez/planning-poker)
[![GitHub license](https://img.shields.io/github/license/lexmartinez/planning-poker.svg?style=for-the-badge)](https://github.com/lexmartinez/planning-poker/blob/master/LICENSE.md)
[![Last version](https://img.shields.io/badge/version-v0.0.1-blue.svg?style=for-the-badge)](https://github.com/lexmartinez/planning-poker/blob/master/CHANGELOG.md)

Planning Poker® Desktop application built with Electron, React & Typescript

## Quick start

```bash
# clone repo
$ git clone https://github.com/lexmartinez/planning-poker

# open work folder
$ cd planning-poker

# install the dependencies
$ npm install

# run the app on develop mode
$ npm start
```

## Table of Contents

* [Development](#development)
* [Packaging](#packaging)
* [License](#license)

### Development

 Once you have installed all dependencies you can now start developing with:

* `npm start` or `yarn start`

 It will start a local server with the React app and the Electron application on development mode, also you can check just the webapp directly on the browser at  [http://localhost:1234](http://localhost:1234).

#### OAuth Login

The App uses GitHub and Google as OAuth providers, so in order to develop and bundle the applications you must [create a GitHub OAuth App](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) and/or [Google Project](https://support.google.com/cloud/answer/6158849?hl=en) and include the given `CLIENT_ID` and `CLIENT_SECRET` on `./src/config/oauth.js`

### Packaging

To bundle code in production mode, run the command bellow, the default output directory is `/dist`

* `npm run dist` or `yarn dist`

### License

Planning Poker® is a registered trademark of [Mountain Goat Software, LLC](https://www.mountaingoatsoftware.com/).

This project is licensed under MIT License - see the [LICENSE.md](https://github.com/lexmartinez/planning-poker/blob/master/LICENSE.md) file for details.
