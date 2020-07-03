# NodeJS-API-Template

[Heroku Demo](https://node-react-api-template-engine.herokuapp.com/)

A simple and production ready Node JS Teamplate Engine backed by express and mongoDB using the
MERN stack architecture. It features a fully installable Isomorphic/Universal rendering experience using react, as
a well as redux for state management. The boilerplate is highly customizable and it allows
you to choose the render method of choice. (SSR, CSR)

## Isomorphic react PWA backed by Express and MongoDB

Some information about the technologies used.

## Technologies

* Node
* Babel
* JSX TSX
* React
* React Router
* Typescript
* Redux State Management
* Express with HTTP/2
* MongoDB
* Mongoose
* Webpack 4
* Docker
* SASS (SCSS)
* CSS Modules
* ESList TSLint
* Offline-first

## Supports out of the box

* Universal rendering
* Code Splitting
* Environment Variables
* Eslint AirBNB Template
* React-Fast-Refresh Hot Module Reload
* MVC Architecture
* Supports Installation
* Suports Notifications
* Suports Background Sync
* Suports Periodic Sync
* Gzip and Brotli compression
* Webjobs using AgendaJS
* Authentication with Passport
* Supports modular modular CSS
* Suppors component styling using sass with isomorphic-style-loader
* Easy setup for component based code-splitting using loadable/components
* Supports rich push notifications
* Supports background and periodic-sync envents
* Docker containarised

## Requirements

* [node & npm](https://nodejs.org/en/)

## Install project.

* `git clone `
* `npm install`

## Build project.

* `npm run build:dev` Builds the code into a bundle and places the code in the build folder.
* `npm run build:prod` Builds and minifies the code into a bundle and plcaes the code in the dist folder.

## Run project.

* `npm run start:dev` Runs the development unminified version of the applicatipn.
* `npm run start:prod` Runs the distribution minified version of the applicatipn.

## Debug project

The scripts specified here are used for debugging purpose. Running this scripsts
will run the code in with hot-reload modes. Nodemon is used for the server and webpacks dev-sever HMR is used for
the client together with the react-fast-refresh plugin.

* `npm run debug:hot:server` Runs the server using nodemon.
* `npm run debug:hot:client` Runs the client using webpack-dev-server and HMR. Note that this will run only the client on CSR
* `npm run debug:hot` Runs the the full configuration by running both the server and client in hot-mode for a full experience

Due to the nature of watch scripts running `debug:hot` can lead to sync problems. If you run into issues during the build try increasing
the sleep delay for running the `webpack-dev-server` in order to allow the first scripts to finish.

